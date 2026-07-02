
# PatchedSpeaker


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`name` | string
`team` | string
`categories` | Array&lt;string&gt;
`links` | [SpeakerLinks](SpeakerLinks.md)
`barcode` | string
`answers` | [Array&lt;Answer&gt;](Answer.md)
`lastName` | string
`email` | string
`phone` | string
`anonymous` | boolean
`codeName` | string
`urlKey` | string
`gender` | string
`pronoun` | string

## Example

```typescript
import type { PatchedSpeaker } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "name": null,
  "team": null,
  "categories": null,
  "links": null,
  "barcode": null,
  "answers": null,
  "lastName": null,
  "email": null,
  "phone": null,
  "anonymous": null,
  "codeName": null,
  "urlKey": null,
  "gender": null,
  "pronoun": null,
} satisfies PatchedSpeaker

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchedSpeaker
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


