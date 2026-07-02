
# ParticipantWebPushDevice

Serializer for TabbycatWebPushDevice that extends the base WebPushDeviceSerializer to include participant and language fields.

## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`registrationId` | string
`active` | boolean
`dateCreated` | Date
`p256dh` | string
`auth` | string
`browser` | [BrowserEnum](BrowserEnum.md)
`applicationId` | string
`participant` | string
`language` | string

## Example

```typescript
import type { ParticipantWebPushDevice } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "registrationId": null,
  "active": null,
  "dateCreated": null,
  "p256dh": null,
  "auth": null,
  "browser": null,
  "applicationId": null,
  "participant": null,
  "language": null,
} satisfies ParticipantWebPushDevice

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ParticipantWebPushDevice
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


