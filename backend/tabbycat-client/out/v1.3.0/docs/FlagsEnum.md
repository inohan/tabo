
# FlagsEnum

* `max_swapped` - Too many swaps * `1u1d_hist` - One-up-one-down (history) * `1u1d_inst` - One-up-one-down (institution) * `1u1d_other` - One-up-one-down (to accommodate) * `bub_up_hist` - Bubble up (history) * `bub_dn_hist` - Bubble down (history) * `bub_up_inst` - Bubble up (institution) * `bub_dn_inst` - Bubble down (institution) * `bub_up_accom` - Bubble up (to accommodate) * `bub_dn_accom` - Bubble down (to accommodate) * `no_bub_updn` - Can\'t bubble up/down * `pullup` - Pull-up team

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { FlagsEnum } from ''

// TODO: Update the object below with actual values
const example = {
} satisfies FlagsEnum

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FlagsEnum
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


