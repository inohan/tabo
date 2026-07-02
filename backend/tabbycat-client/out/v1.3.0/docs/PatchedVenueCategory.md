
# PatchedVenueCategory


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`venues` | Array&lt;string&gt;
`name` | string
`description` | string
`displayInVenueName` | [DisplayInVenueNameEnum](DisplayInVenueNameEnum.md)
`displayInPublicTooltip` | boolean

## Example

```typescript
import type { PatchedVenueCategory } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "venues": null,
  "name": null,
  "description": null,
  "displayInVenueName": null,
  "displayInPublicTooltip": null,
} satisfies PatchedVenueCategory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchedVenueCategory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


