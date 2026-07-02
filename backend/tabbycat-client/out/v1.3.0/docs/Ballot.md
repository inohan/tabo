
# Ballot


## Properties

Name | Type
------------ | -------------
`id` | number
`result` | [Result](Result.md)
`motion` | string
`url` | string
`participantSubmitter` | string
`vetos` | [Array&lt;Veto&gt;](Veto.md)
`timestamp` | Date
`version` | number
`submitterType` | [SubmitterTypeEnum](SubmitterTypeEnum.md)
`confirmed` | boolean
`privateUrl` | boolean
`confirmTimestamp` | Date
`ipAddress` | string
`discarded` | boolean
`singleAdj` | boolean
`forfeit` | boolean
`submitter` | number
`confirmer` | number

## Example

```typescript
import type { Ballot } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "result": null,
  "motion": null,
  "url": null,
  "participantSubmitter": null,
  "vetos": null,
  "timestamp": null,
  "version": null,
  "submitterType": null,
  "confirmed": null,
  "privateUrl": null,
  "confirmTimestamp": null,
  "ipAddress": null,
  "discarded": null,
  "singleAdj": null,
  "forfeit": null,
  "submitter": null,
  "confirmer": null,
} satisfies Ballot

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Ballot
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


