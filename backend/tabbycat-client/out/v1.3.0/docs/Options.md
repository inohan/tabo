
# Options


## Properties

Name | Type
------------ | -------------
`avoidInstitution` | boolean
`avoidHistory` | boolean
`historyPenalty` | number
`institutionPenalty` | number
`pullupDebatesPenalty` | number
`sidePenalty` | number
`pairingPenalty` | number
`sideAllocations` | [SideAllocationsEnum](SideAllocationsEnum.md)
`avoidConflicts` | [AvoidConflictsEnum](AvoidConflictsEnum.md)
`oddBracket` | [OddBracketEnum](OddBracketEnum.md)
`pairingMethod` | [PairingMethodEnum](PairingMethodEnum.md)
`pullupRestriction` | [PullupRestrictionEnum](PullupRestrictionEnum.md)
`pullup` | [PullupEnum](PullupEnum.md)
`positionCost` | [PositionCostEnum](PositionCostEnum.md)
`assignmentMethod` | [AssignmentMethodEnum](AssignmentMethodEnum.md)
`renyiOrder` | number
`exponent` | number
`maxTimesOnOneSide` | number
`pullupPenalty` | number

## Example

```typescript
import type { Options } from ''

// TODO: Update the object below with actual values
const example = {
  "avoidInstitution": null,
  "avoidHistory": null,
  "historyPenalty": null,
  "institutionPenalty": null,
  "pullupDebatesPenalty": null,
  "sidePenalty": null,
  "pairingPenalty": null,
  "sideAllocations": null,
  "avoidConflicts": null,
  "oddBracket": null,
  "pairingMethod": null,
  "pullupRestriction": null,
  "pullup": null,
  "positionCost": null,
  "assignmentMethod": null,
  "renyiOrder": null,
  "exponent": null,
  "maxTimesOnOneSide": null,
  "pullupPenalty": null,
} satisfies Options

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Options
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


