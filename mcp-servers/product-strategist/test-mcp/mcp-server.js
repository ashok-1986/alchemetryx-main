/**
 * Alchemetryx Product Strategist MCP Server
 * Plain JavaScript implementation
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { spawn } from 'child_process';
import * as path from 'path';

const OKR_GENERATOR_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE,
  '.agents/skills/claude-skills-main/product-team/product-strategist/scripts/okr_cascade_generator.py'
);

// Alchemetryx brand-aligned defaults
const ALCHEMETRYX_DEFAULTS = {
  teams: ['Growth', 'Platform', 'Data'],
  contribution: 0.3,
  brandMapping: {
    growth: 'Hammer vs Workshop - Build systems, not buy tools',
    operational: 'Systems before scale - Build systems that run themselves',
    retention: 'Systems that run on their own',
    innovation: 'Differentiation through system design',
    revenue: 'Sustainable growth through system leverage'
  }
};

class ProductStrategistServer {
  constructor() {
    this.server = new Server(
      {
        name: 'alchemetryx-product-strategist',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'generate_okr_cascade',
          description: 'Generate aligned OKR cascade from company strategy to team level, aligned with Alchemetryx brand philosophy (Hammer vs Workshop, Systems before scale)',
          inputSchema: {
            type: 'object',
            properties: {
              strategy: {
                type: 'string',
                enum: ['growth', 'retention', 'revenue', 'innovation', 'operational'],
                description: 'Strategy type: growth=Hammer vs Workshop, operational=Systems before scale, retention=Systems that run themselves'
              },
              teams: {
                type: 'array',
                items: { type: 'string' },
                default: ['Growth', 'Platform', 'Data'],
                description: 'Alchemetryx team structure: Growth (Ashok), Platform (Systems), Data (Measurement)'
              },
              contribution: {
                type: 'number',
                default: 0.3,
                minimum: 0,
                maximum: 1,
                description: 'Product contribution to company OKRs (default 30%)'
              },
              metrics: {
                type: 'object',
                properties: {
                  current: { type: 'number', description: 'Current MAU' },
                  target: { type: 'number', description: 'Target MAU' },
                  current_nps: { type: 'number', description: 'Current NPS' },
                  target_nps: { type: 'number', description: 'Target NPS' },
                  current_revenue: { type: 'number', description: 'Current ARR in millions' },
                  target_revenue: { type: 'number', description: 'Target ARR in millions' }
                }
              },
              output_format: {
                type: 'string',
                enum: ['dashboard', 'json'],
                default: 'dashboard',
                description: 'Output format: dashboard (human-readable) or JSON'
              }
            },
            required: ['strategy']
          }
        },
        {
          name: 'calculate_alignment',
          description: 'Calculate alignment scores for OKR cascade',
          inputSchema: {
            type: 'object',
            properties: {
              okrs: {
                type: 'object',
                description: 'OKR cascade object with company, product, and teams'
              }
            },
            required: ['okrs']
          }
        },
        {
          name: 'get_brand_aligned_strategy',
          description: 'Get strategy recommendations aligned with Alchemetryx brand philosophy',
          inputSchema: {
            type: 'object',
            properties: {
              context: {
                type: 'string',
                enum: ['quarterly_planning', 'annual_strategy', 'board_review', 'team_alignment'],
                description: 'Context for strategy recommendation'
              }
            }
          }
        }
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'generate_okr_cascade':
          return await this.generateOKRCascade(request.params.arguments);
        case 'calculate_alignment':
          return await this.calculateAlignment(request.params.arguments);
        case 'get_brand_aligned_strategy':
          return await this.getBrandAlignedStrategy(request.params.arguments);
        default:
          throw new McpError(ErrorCode.MethodNotFound, 'Unknown tool: ' + request.params.name);
      }
    });
  }

  async generateOKRCascade(args) {
    const {
      strategy = 'growth',
      teams = ['Growth', 'Platform', 'Data'],
      contribution = 0.3,
      metrics = {},
      output_format = 'dashboard'
    } = args;

    if (!['growth', 'retention', 'revenue', 'innovation', 'operational'].includes(strategy)) {
      throw new McpError(ErrorCode.InvalidParams, 'Invalid strategy: ' + strategy + '. Must be one of: growth, retention, revenue, innovation, operational');
    }

    const metricsArgs = {
      current: metrics.current || 100000,
      target: metrics.target || 150000,
      current_nps: metrics.current_nps || 40,
      target_nps: metrics.target_nps || 60,
      current_revenue: metrics.current_revenue || 10,
      target_revenue: metrics.target_revenue || 15
    };

    const cmd = [
      'python',
      OKR_GENERATOR_PATH,
      strategy,
      '--teams', teams.join(','),
      '--contribution', contribution.toString(),
      '--metrics', JSON.stringify(metricsArgs),
      output_format === 'json' ? '--json' : ''
    ].filter(Boolean);

    return new Promise((resolve, reject) => {
      const child = spawn('python', cmd.slice(1), {
        cwd: path.dirname(OKR_GENERATOR_PATH),
        env: { ...process.env, PYTHONPATH: path.dirname(OKR_GENERATOR_PATH) }
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => { stdout += data.toString(); });
      child.stderr.on('data', (data) => { stderr += data.toString(); });

      child.on('close', (code) => {
        if (code !== 0) {
          reject(new McpError(ErrorCode.InternalError, 'OKR generation failed: ' + stderr));
        } else {
          const brandNote = '\n\n---\n📌 **Alchemetryx Brand Alignment**: ' + (ALCHEMETRYX_DEFAULTS.brandMapping[strategy] || 'Aligned with Systems before scale / Hammer vs Workshop philosophy');

          resolve({
            content: [
              {
                type: 'text',
                text: stdout + brandNote
              }
            ]
          });
        }
      });
    });
  }

  async calculateAlignment(args) {
    const { okrs } = args;

    const child = spawn('python', [
      '-c',
      'import json\nimport sys\nsys.path.append(r\'' + path.dirname(OKR_GENERATOR_PATH).replace(/\\/g, '\\\\') + '\')\nfrom okr_cascade_generator import OKRGenerator\n\nokrs = json.loads(sys.stdin.read())\ngenerator = OKRGenerator(teams=[\'Growth\', \'Platform\', \'Data\'], product_contribution=0.3)\nalignment = generator.calculate_alignment_score(okrs)\nprint(json.dumps(alignment, indent=2))'
    ], {
      cwd: path.dirname(OKR_GENERATOR_PATH)
    });

    return new Promise((resolve, reject) => {
      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => { stdout += data.toString(); });
      child.stderr.on('data', (data) => { stderr += data.toString(); });

      child.stdin.write(JSON.stringify(okrs));
      child.stdin.end();

      child.on('close', (code) => {
        if (code !== 0) {
          reject(new McpError(ErrorCode.InternalError, 'Alignment calculation failed: ' + stderr));
        } else {
          resolve({
            content: [
              {
                type: 'text',
                text: 'Alignment Scores:\n' + stdout
              }
            ]
          });
        }
      });
    });
  }

  async getBrandAlignedStrategy(args) {
    const { context = 'quarterly_planning' } = args;

    const recommendations = {
      quarterly_planning: {
        primary: 'operational',
        rationale: 'Alchemetryx quarterly planning should focus on "Systems before scale" - ensuring each engagement builds a system that runs on its own',
        okrFocus: 'Operational excellence through system delivery',
        metrics: ['systems delivered', 'time-to-value', 'client self-sufficiency']
      },
      annual_strategy: {
        primary: 'growth',
        secondary: 'operational',
        rationale: 'Annual strategy should balance "Hammer vs Workshop" growth with "Systems before scale" delivery',
        okrFocus: 'Scale through system leverage, not headcount',
        metrics: ['systems deployed', 'client self-sufficiency rate', 'system leverage ratio']
      },
      board_review: {
        primary: 'growth',
        rationale: 'Board reviews should demonstrate "Hammer vs Workshop" differentiation - we build workshops (systems), not sell hammers (tools)',
        okrFocus: 'Differentiation through system delivery',
        metrics: ['client systems delivered', 'system leverage', 'client self-sufficiency']
      },
      team_alignment: {
        primary: 'operational',
        rationale: 'Team alignment should reflect "Systems before scale" - each team builds components of the workshop',
        okrFocus: 'Cross-team system coherence',
        metrics: ['system integration score', 'handoff reduction', 'shared component reuse']
      }
    };

    const rec = recommendations[context] || recommendations.quarterly_planning;

    return {
      content: [
        {
          type: 'text',
          text: '🎯 **Alchemetryx Brand-Aligned Strategy Recommendation**\n\n' +
            '**Context**: ' + context + '\n' +
            '**Primary Strategy**: ' + rec.primary.toUpperCase() + '\n' +
            '**Brand Rationale**: ' + rec.rationale + '\n\n' +
            '**OKR Focus**: ' + rec.okrFocus + '\n' +
            '**Key Metrics**: ' + rec.metrics.join(', ') + '\n\n' +
            '**Brand Philosophy Applied**:\n' +
            '- "Hammer vs Workshop" → ' + ALCHEMETRYX_DEFAULTS.brandMapping.growth + '\n' +
            '- "Systems before scale" → ' + ALCHEMETRYX_DEFAULTS.brandMapping.operational + '\n' +
            '- "Systems that run on their own" → ' + ALCHEMETRYX_DEFAULTS.brandMapping.retention + '\n\n' +
            '**Team Alignment** (Alchemetryx structure):\n' +
            '- Growth (Ashok): ' + ALCHEMETRYX_DEFAULTS.teams[0] + ' - acquisition, activation, viral loops\n' +
            '- Platform (Systems): ' + ALCHEMETRYX_DEFAULTS.teams[1] + ' - infrastructure, reliability, scale\n' +
            '- Data (Measurement): ' + ALCHEMETRYX_DEFAULTS.teams[2] + ' - analytics, insights, experimentation\n\n' +
            '**Next Step**: Run `generate_okr_cascade` with strategy="' + rec.primary + '" to generate aligned OKRs'
        }
      ];
    }
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Server Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Alchemetryx Product Strategist MCP server running on stdio');
  }
}

const server = new ProductStrategistServer();
server.run().catch(console.error);