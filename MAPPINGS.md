# OTLP Mapping for OSSP (Logs/HTTP)

| CloudEvents / OSSP field          | OTLP LogRecord / Resource attribute                     |
| --------------------------------- | ------------------------------------------------------- |
| `id`                              | `attributes["ce.id"]`                                   |
| `type`                            | `attributes["ce.type"]`                                 |
| `source`                          | `attributes["ce.source"]`                               |
| `time`                            | `time_unix_nano`                                        |
| `subject`                         | `attributes["ce.subject"]`                             |
| `dataschema`                      | `attributes["ce.dataschema"]`                          |
| `data.resource.model_id`          | `resource.attributes["ai.model.id"]`                   |
| `data.resource.model_version`     | `resource.attributes["ai.model.version"]`              |
| `data.resource.environment`       | `resource.attributes["deployment.environment"]`        |
| `data.action_taken`               | `attributes["ai.safety.action_taken"]`                 |
| `data.reason`                     | `attributes["ai.safety.reason"]`                       |
| `data.severity`                   | `severity_text` / `attributes["ai.safety.severity"]`   |
| `data.input_hash`                 | `attributes["ai.input.hash"]`                          |
| `correlationid` (extension field) | `trace_id` or `attributes["correlation.id"]`           |

Use the OpenTelemetry Collector to convert CloudEvents to OTLP and export to any backend.
