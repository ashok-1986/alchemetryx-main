# Alchemetryx Product Strategist MCP Integration

## Overview
MCP server integration for the Product Strategist skill, aligned with Alchemetryx brand philosophy:
- **Growth** = "Hammer vs Workshop" (building systems vs buying tools)
- **Operational** = "Systems before scale"
- **Retention** = "Systems that run on their own"

## Quick Start

### 1. Install Dependencies
```bash
cd mcp-servers/product-strategist
npm install
```

### 2. Test the OKR Generator
```bash
# Test growth strategy (Hammer vs Workshop)
python ../../.agents/skills/claude-skills-main/product-team/product-strategist/scripts/okr_cascade_generator.py growth

# Test operational strategy (Systems before scale)
python ../../.agents/skills/claude-skills-main/product-team/product-strategist/scripts/okr_cascade_generator.py operational --teams "Growth,Platform,Data"

# Test with Alchemetryx brand context
python ../../.agents/skills/claude-skills-main/product-team/product-strategist/scripts/okr_cascade_generator.py growth --teams "Growth,Platform,Data" --json
```

### 3. Run MCP Server
```bash
cd mcp-servers/product-strategist
node mcp-server.js
```

## Available Tools

### `generate_okr_cascade`
Generate aligned OKR cascade from company strategy to team level.

**Parameters:**
- `strategy` (required): `growth` | `retention` | `revenue` | `innovation` | `operational`
- `teams`: Array of team names (default: `["Growth", "Platform", "Data"]`)
- `contribution`: Product contribution to company OKRs (default: 0.3)
- `metrics`: Object with current/target MAU, NPS, revenue
- `output_format`: `"dashboard"` or `"json"` (default: `"dashboard"`)

**Example:**
```json
{
  "strategy": "growth",
  "teams": ["Growth", "Platform", "Data"],
  "contribution": 0.3,
  "metrics": { "current": 100000, "target": 150000 }
}
```

### `calculate_alignment`
Calculate alignment scores for an OKR cascade.

### `get_brand_aligned_strategy`
Get strategy recommendations aligned with Alchemetryx brand philosophy.

**Contexts:**
- `quarterly_planning` → primary: operational ("Systems before scale")
- `annual_strategy` → primary: growth ("Hammer vs Workshop")
- `board_review` → primary: growth ("Hammer vs Workshop")
- `team_alignment` → primary: operational ("Systems before scale")

## Alchemetryx Brand Mapping

| Strategy | Brand Philosophy | Team Focus |
|----------|-----------------|------------|
| **growth** | "Hammer vs Workshop" - Build systems, not buy tools | Growth: acquisition/activation, Platform: infrastructure, Data: measurement |
| **operational** | "Systems before scale" - Build systems that run themselves | Platform: reliability/scale, Growth: system delivery, Data: system metrics |
| **retention** | "Systems that run on their own" | Data: retention metrics, Platform: system reliability, Growth: customer success systems |
| **innovation** | Differentiation through system design | Platform: platform capabilities, Data: predictive systems |
| **revenue** | Sustainable growth through system leverage | Growth: revenue systems, Platform: billing systems, Data: revenue analytics |

## Alchemetryx Team Structure
```json
{
  "teams": ["Growth", "Platform", "Data"],
  "roles": {
    "Growth": "Ashok - acquisition, activation, viral loops",
    "Platform": "Systems - infrastructure, reliability, scale",
    "Data": "Measurement - analytics, insights, experimentation"
  },
  "contribution": 0.3
}
```

## VS Code Integration
Add to `.vscode/mcp.json`:
```json
{
  "mcpServers": {
    "alchemetryx-product-strategist": {
      "command": "node",
      "args": ["mcp-servers/product-strategist/mcp-server.js"],
      "cwd": ".",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/.agents/skills/claude-skills-main/product-team/product-strategist/scripts"
      }
    }
  }
}
```

## Example Usage in AI Assistant

```
User: "Generate Q1 OKRs for Alchemetryx with growth strategy"

Assistant calls generate_okr_cascade with:
{
  "strategy": "growth",
  "teams": ["Growth", "Platform", "Data"],
  "contribution": 0.3,
  "metrics": { "current": 50000, "target": 100000 }
}
```

Returns aligned OKR cascade with brand alignment note:
> 📌 **Alchemetryx Brand Alignment**: Hammer vs Workshop - Build systems, not buy tools