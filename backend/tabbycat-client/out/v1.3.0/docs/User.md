
# User


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`username` | string
`password` | string
`isSuperuser` | boolean
`isStaff` | boolean
`email` | string
`isActive` | boolean
`dateJoined` | Date
`lastLogin` | Date
`tournaments` | [Array&lt;TournamentPermissions&gt;](TournamentPermissions.md)

## Example

```typescript
import type { User } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "username": null,
  "password": null,
  "isSuperuser": null,
  "isStaff": null,
  "email": null,
  "isActive": null,
  "dateJoined": null,
  "lastLogin": null,
  "tournaments": null,
} satisfies User

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as User
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


