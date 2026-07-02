# DebatesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsRoundsPairingsCreate**](DebatesApi.md#apiv1tournamentsroundspairingscreate) | **POST** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings | Create pairing |
| [**apiV1TournamentsRoundsPairingsCreate2**](DebatesApi.md#apiv1tournamentsroundspairingscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/{debate_pk} | Update pairing |
| [**apiV1TournamentsRoundsPairingsDestroy**](DebatesApi.md#apiv1tournamentsroundspairingsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings | Delete all pairings in the round |
| [**apiV1TournamentsRoundsPairingsDestroy2**](DebatesApi.md#apiv1tournamentsroundspairingsdestroy2) | **DELETE** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/{debate_pk} | Delete pairing |
| [**apiV1TournamentsRoundsPairingsGenerateDrawCreate**](DebatesApi.md#apiv1tournamentsroundspairingsgeneratedrawcreate) | **POST** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/generate-draw | Generate draw for round |
| [**apiV1TournamentsRoundsPairingsList**](DebatesApi.md#apiv1tournamentsroundspairingslist) | **GET** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings | List pairings in round |
| [**apiV1TournamentsRoundsPairingsPartialUpdate**](DebatesApi.md#apiv1tournamentsroundspairingspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/{debate_pk} | Patch pairing |
| [**apiV1TournamentsRoundsPairingsRetrieve**](DebatesApi.md#apiv1tournamentsroundspairingsretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/{debate_pk} | Get pairing |
| [**apiV1TournamentsRoundsPreformedPanelsCreate**](DebatesApi.md#apiv1tournamentsroundspreformedpanelscreate) | **POST** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/preformed-panels | Create preformed panel |
| [**apiV1TournamentsRoundsPreformedPanelsCreate2**](DebatesApi.md#apiv1tournamentsroundspreformedpanelscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/preformed-panels/{debate_pk} | Update preformed panel |
| [**apiV1TournamentsRoundsPreformedPanelsDestroy**](DebatesApi.md#apiv1tournamentsroundspreformedpanelsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/preformed-panels | Delete all preformed panels from round |
| [**apiV1TournamentsRoundsPreformedPanelsDestroy2**](DebatesApi.md#apiv1tournamentsroundspreformedpanelsdestroy2) | **DELETE** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/preformed-panels/{debate_pk} | Delete preformed panel |
| [**apiV1TournamentsRoundsPreformedPanelsList**](DebatesApi.md#apiv1tournamentsroundspreformedpanelslist) | **GET** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/preformed-panels | List all preformed panels in the round |
| [**apiV1TournamentsRoundsPreformedPanelsPartialUpdate**](DebatesApi.md#apiv1tournamentsroundspreformedpanelspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/preformed-panels/{debate_pk} | Patch preformed panel |
| [**apiV1TournamentsRoundsPreformedPanelsRetrieve**](DebatesApi.md#apiv1tournamentsroundspreformedpanelsretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/preformed-panels/{debate_pk} | Get preformed panel |
| [**apiV1TournamentsRoundsPreformedPanelsUpdate**](DebatesApi.md#apiv1tournamentsroundspreformedpanelsupdate) | **PUT** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/preformed-panels | Add blank preformed panels |



## apiV1TournamentsRoundsPairingsCreate

> RoundPairing apiV1TournamentsRoundsPairingsCreate(roundSeq, tournamentSlug, roundPairing)

Create pairing

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // RoundPairing
    roundPairing: ...,
  } satisfies ApiV1TournamentsRoundsPairingsCreateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsCreate(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **roundPairing** | [RoundPairing](RoundPairing.md) |  | |

### Return type

[**RoundPairing**](RoundPairing.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPairingsCreate2

> RoundPairing apiV1TournamentsRoundsPairingsCreate2(debatePk, roundSeq, tournamentSlug, roundPairing)

Update pairing

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // RoundPairing
    roundPairing: ...,
  } satisfies ApiV1TournamentsRoundsPairingsCreate2Request;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsCreate2(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **roundPairing** | [RoundPairing](RoundPairing.md) |  | |

### Return type

[**RoundPairing**](RoundPairing.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPairingsDestroy

> apiV1TournamentsRoundsPairingsDestroy(roundSeq, tournamentSlug)

Delete all pairings in the round

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRoundsPairingsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsDestroy(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No response body |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPairingsDestroy2

> apiV1TournamentsRoundsPairingsDestroy2(debatePk, roundSeq, tournamentSlug)

Delete pairing

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsDestroy2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRoundsPairingsDestroy2Request;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsDestroy2(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No response body |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPairingsGenerateDrawCreate

> Array&lt;RoundPairing&gt; apiV1TournamentsRoundsPairingsGenerateDrawCreate(roundSeq, tournamentSlug, limit, offset, drawGeneration)

Generate draw for round

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsGenerateDrawCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
    // DrawGeneration (optional)
    drawGeneration: ...,
  } satisfies ApiV1TournamentsRoundsPairingsGenerateDrawCreateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsGenerateDrawCreate(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |
| **drawGeneration** | [DrawGeneration](DrawGeneration.md) |  | [Optional] |

### Return type

[**Array&lt;RoundPairing&gt;**](RoundPairing.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPairingsList

> Array&lt;RoundPairing&gt; apiV1TournamentsRoundsPairingsList(roundSeq, tournamentSlug, limit, offset)

List pairings in round

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsRoundsPairingsListRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsList(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;RoundPairing&gt;**](RoundPairing.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPairingsPartialUpdate

> RoundPairing apiV1TournamentsRoundsPairingsPartialUpdate(debatePk, roundSeq, tournamentSlug, patchedRoundPairing)

Patch pairing

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedRoundPairing (optional)
    patchedRoundPairing: ...,
  } satisfies ApiV1TournamentsRoundsPairingsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsPartialUpdate(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **patchedRoundPairing** | [PatchedRoundPairing](PatchedRoundPairing.md) |  | [Optional] |

### Return type

[**RoundPairing**](RoundPairing.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPairingsRetrieve

> RoundPairing apiV1TournamentsRoundsPairingsRetrieve(debatePk, roundSeq, tournamentSlug)

Get pairing

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRoundsPairingsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsRetrieve(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**RoundPairing**](RoundPairing.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPreformedPanelsCreate

> PreformedPanel apiV1TournamentsRoundsPreformedPanelsCreate(roundSeq, tournamentSlug, preformedPanel)

Create preformed panel

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPreformedPanelsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PreformedPanel (optional)
    preformedPanel: ...,
  } satisfies ApiV1TournamentsRoundsPreformedPanelsCreateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPreformedPanelsCreate(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **preformedPanel** | [PreformedPanel](PreformedPanel.md) |  | [Optional] |

### Return type

[**PreformedPanel**](PreformedPanel.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPreformedPanelsCreate2

> PreformedPanel apiV1TournamentsRoundsPreformedPanelsCreate2(debatePk, roundSeq, tournamentSlug, preformedPanel)

Update preformed panel

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPreformedPanelsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PreformedPanel (optional)
    preformedPanel: ...,
  } satisfies ApiV1TournamentsRoundsPreformedPanelsCreate2Request;

  try {
    const data = await api.apiV1TournamentsRoundsPreformedPanelsCreate2(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **preformedPanel** | [PreformedPanel](PreformedPanel.md) |  | [Optional] |

### Return type

[**PreformedPanel**](PreformedPanel.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPreformedPanelsDestroy

> apiV1TournamentsRoundsPreformedPanelsDestroy(roundSeq, tournamentSlug)

Delete all preformed panels from round

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPreformedPanelsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRoundsPreformedPanelsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPreformedPanelsDestroy(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No response body |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPreformedPanelsDestroy2

> apiV1TournamentsRoundsPreformedPanelsDestroy2(debatePk, roundSeq, tournamentSlug)

Delete preformed panel

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPreformedPanelsDestroy2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRoundsPreformedPanelsDestroy2Request;

  try {
    const data = await api.apiV1TournamentsRoundsPreformedPanelsDestroy2(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No response body |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPreformedPanelsList

> Array&lt;PreformedPanel&gt; apiV1TournamentsRoundsPreformedPanelsList(roundSeq, tournamentSlug, limit, offset)

List all preformed panels in the round

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPreformedPanelsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsRoundsPreformedPanelsListRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPreformedPanelsList(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;PreformedPanel&gt;**](PreformedPanel.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPreformedPanelsPartialUpdate

> PreformedPanel apiV1TournamentsRoundsPreformedPanelsPartialUpdate(debatePk, roundSeq, tournamentSlug, patchedPreformedPanel)

Patch preformed panel

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPreformedPanelsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedPreformedPanel (optional)
    patchedPreformedPanel: ...,
  } satisfies ApiV1TournamentsRoundsPreformedPanelsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPreformedPanelsPartialUpdate(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **patchedPreformedPanel** | [PatchedPreformedPanel](PatchedPreformedPanel.md) |  | [Optional] |

### Return type

[**PreformedPanel**](PreformedPanel.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPreformedPanelsRetrieve

> PreformedPanel apiV1TournamentsRoundsPreformedPanelsRetrieve(debatePk, roundSeq, tournamentSlug)

Get preformed panel

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPreformedPanelsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRoundsPreformedPanelsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPreformedPanelsRetrieve(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**PreformedPanel**](PreformedPanel.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPreformedPanelsUpdate

> PreformedPanel apiV1TournamentsRoundsPreformedPanelsUpdate(roundSeq, tournamentSlug, preformedPanel)

Add blank preformed panels

Adds new complete set of panels, with calculated bracket and liveness.

### Example

```ts
import {
  Configuration,
  DebatesApi,
} from '';
import type { ApiV1TournamentsRoundsPreformedPanelsUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new DebatesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PreformedPanel (optional)
    preformedPanel: ...,
  } satisfies ApiV1TournamentsRoundsPreformedPanelsUpdateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPreformedPanelsUpdate(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **preformedPanel** | [PreformedPanel](PreformedPanel.md) |  | [Optional] |

### Return type

[**PreformedPanel**](PreformedPanel.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

