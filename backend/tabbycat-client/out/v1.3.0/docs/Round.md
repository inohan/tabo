
# Round


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`breakCategory` | string
`motions` | [Array&lt;RoundMotion&gt;](RoundMotion.md)
`startsAt` | Date
`motionsReleased` | boolean
`links` | [RoundLinks](RoundLinks.md)
`seq` | number
`completed` | boolean
`name` | string
`abbreviation` | string
`stage` | [StageEnum](StageEnum.md)
`drawType` | [DrawTypeEnum](DrawTypeEnum.md)
`drawStatus` | [DrawStatusEnum](DrawStatusEnum.md)
`feedbackWeight` | number
`silent` | boolean
`motionsStatus` | [MotionsStatusEnum](MotionsStatusEnum.md)
`weight` | number

## Example

```typescript
import type { Round } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "breakCategory": null,
  "motions": null,
  "startsAt": null,
  "motionsReleased": null,
  "links": null,
  "seq": null,
  "completed": null,
  "name": null,
  "abbreviation": null,
  "stage": null,
  "drawType": null,
  "drawStatus": null,
  "feedbackWeight": null,
  "silent": null,
  "motionsStatus": null,
  "weight": null,
} satisfies Round

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Round
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


