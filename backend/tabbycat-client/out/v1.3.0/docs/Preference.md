
# Preference


## Properties

Name | Type
------------ | -------------
`section` | string
`name` | string
`identifier` | string
`_default` | string
`value` | string
`verboseName` | string
`helpText` | string
`additionalData` | string
`field` | string

## Example

```typescript
import type { Preference } from ''

// TODO: Update the object below with actual values
const example = {
  "section": null,
  "name": null,
  "identifier": null,
  "_default": null,
  "value": null,
  "verboseName": null,
  "helpText": null,
  "additionalData": null,
  "field": null,
} satisfies Preference

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Preference
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


