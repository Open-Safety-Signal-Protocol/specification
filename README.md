# The Open Safety Signal Protocol (OSSP) Specification

[![Spec Version](https://img.shields.io/badge/OSSP-v1.0.0-blue)](./SPECIFICATION_V1.md)
[![License](https://img.shields.io/badge/License-Apache%202.0-lightgrey.svg)](./LICENSE)
[![Website](https://img.shields.io/badge/website-glacis.io-brightgreen.svg)](https://glacis.io)

**The open, vendor-neutral standard for AI safety telemetry.**

OSSP defines how AI systems emit **governance, safety, and risk** signals. Built on CloudEvents for transport with AI-specific schemas for compliance with EU AI Act, NIST RMF, and ISO 42001.

- Read the **[Formal Specification (v1.0.0)](./SPECIFICATION_V1.md)**
- Browse **[Taxonomy](./taxonomy/README.md)** and **[Schemas](./schema/v1.0.0)**
- See **[Integration Guide](./INTEGRATION.md)**

## Quick Start

```json
{
  "specversion": "1.0",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "source": "urn:app:credit-scoring-prod",
  "type": "ai.safety.guardrail.interaction",
  "time": "2025-09-18T14:23:54Z",
  "subject": "urn:model:gpt-4o",
  "datacontenttype": "application/json",
  "dataschema": "https://ossp.io/schema/v1.0.0/ai.safety.guardrail.interaction.schema.json",
  "data": {
    "resource": {
      "model_id": "gpt-4o",
      "environment": "production",
      "model_version": "2025-09-01.3"
    },
    "action_taken": "block",
    "reason": "Detected PII leakage",
    "severity": "high",
    "guardrail_id": "pii-filter-v2"
  }
}
```

## The Neutrality Pledge

OSSP will be donated to a neutral foundation (CNCF or LF AI & Data) within 12-18 months of v1.0 release. See [GOVERNANCE](../community/GOVERNANCE.md).

---
*Initial development led by [Glacis](https://glacis.io), building the control plane for deployed AI.*
