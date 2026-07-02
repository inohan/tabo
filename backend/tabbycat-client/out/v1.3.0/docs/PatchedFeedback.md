
# PatchedFeedback


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`adjudicator` | string
`source` | string
`participantSubmitter` | string
`debate` | string
`answers` | [Array&lt;AdjAnswer&gt;](AdjAnswer.md)
`timestamp` | Date
`version` | number
`submitterType` | [SubmitterTypeEnum](SubmitterTypeEnum.md)
`confirmed` | boolean
`privateUrl` | boolean
`confirmTimestamp` | Date
`ipAddress` | string
`score` | number
`ignored` | boolean
`submitter` | number
`confirmer` | number

## Example

```typescript
import type { PatchedFeedback } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "adjudicator": null,
  "source": null,
  "participantSubmitter": null,
  "debate": null,
  "answers": null,
  "timestamp": null,
  "version": null,
  "submitterType": null,
  "confirmed": null,
  "privateUrl": null,
  "confirmTimestamp": null,
  "ipAddress": null,
  "score": null,
  "ignored": null,
  "submitter": null,
  "confirmer": null,
} satisfies PatchedFeedback

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchedFeedback
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


