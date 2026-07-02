
# PatchedQuestion


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`seq` | number
`text` | string
`helpText` | string
`name` | string
`answerType` | [AnswerTypeEnum](AnswerTypeEnum.md)
`required` | boolean
`minValue` | number
`maxValue` | number
`choices` | Array&lt;string&gt;
`forContentType` | number

## Example

```typescript
import type { PatchedQuestion } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "seq": null,
  "text": null,
  "helpText": null,
  "name": null,
  "answerType": null,
  "required": null,
  "minValue": null,
  "maxValue": null,
  "choices": null,
  "forContentType": null,
} satisfies PatchedQuestion

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchedQuestion
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


