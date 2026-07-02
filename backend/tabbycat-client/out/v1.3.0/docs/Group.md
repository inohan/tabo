
# Group


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`name` | string
`permissions` | [Array&lt;PermissionsEnum&gt;](PermissionsEnum.md)
`users` | Array&lt;number&gt;

## Example

```typescript
import type { Group } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "name": null,
  "permissions": null,
  "users": null,
} satisfies Group

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Group
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


