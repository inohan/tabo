
# RoundPairing


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`venue` | string
`teams` | [Array&lt;DebateTeam&gt;](DebateTeam.md)
`adjudicators` | [DebateAdjudicator](DebateAdjudicator.md)
`barcode` | string
`links` | [PairingLinks](PairingLinks.md)
`bracket` | number
`roomRank` | number
`flags` | [Array&lt;FlagsEnum&gt;](FlagsEnum.md)
`importance` | [RoundPairingImportanceEnum](RoundPairingImportanceEnum.md)
`resultStatus` | [ResultStatusEnum](ResultStatusEnum.md)
`sidesConfirmed` | boolean

## Example

```typescript
import type { RoundPairing } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "venue": null,
  "teams": null,
  "adjudicators": null,
  "barcode": null,
  "links": null,
  "bracket": null,
  "roomRank": null,
  "flags": null,
  "importance": null,
  "resultStatus": null,
  "sidesConfirmed": null,
} satisfies RoundPairing

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoundPairing
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


