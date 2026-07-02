
# Venue


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`categories` | Array&lt;string&gt;
`displayName` | string
`externalUrl` | string
`barcode` | string
`links` | [VenueLinks](VenueLinks.md)
`name` | string
`priority` | number

## Example

```typescript
import type { Venue } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "categories": null,
  "displayName": null,
  "externalUrl": null,
  "barcode": null,
  "links": null,
  "name": null,
  "priority": null,
} satisfies Venue

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Venue
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


