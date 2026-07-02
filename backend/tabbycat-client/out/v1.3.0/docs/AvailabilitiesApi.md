# AvailabilitiesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsRoundsAvailabilitiesCreate**](AvailabilitiesApi.md#apiv1tournamentsroundsavailabilitiescreate) | **POST** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/availabilities | Mark objects as unavailable |
| [**apiV1TournamentsRoundsAvailabilitiesDestroy**](AvailabilitiesApi.md#apiv1tournamentsroundsavailabilitiesdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/availabilities | Delete class of availabilities |
| [**apiV1TournamentsRoundsAvailabilitiesList**](AvailabilitiesApi.md#apiv1tournamentsroundsavailabilitieslist) | **GET** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/availabilities | Get all availabilities of the round |
| [**apiV1TournamentsRoundsAvailabilitiesPartialUpdate**](AvailabilitiesApi.md#apiv1tournamentsroundsavailabilitiespartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/availabilities | Toggle the availabilities of the included objects |
| [**apiV1TournamentsRoundsAvailabilitiesUpdate**](AvailabilitiesApi.md#apiv1tournamentsroundsavailabilitiesupdate) | **PUT** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/availabilities | Mark objects as available |



## apiV1TournamentsRoundsAvailabilitiesCreate

> Array&lt;string&gt; apiV1TournamentsRoundsAvailabilitiesCreate(roundSeq, tournamentSlug, requestBody)

Mark objects as unavailable

### Example

```ts
import {
  Configuration,
  AvailabilitiesApi,
} from '';
import type { ApiV1TournamentsRoundsAvailabilitiesCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AvailabilitiesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Array<string>
    requestBody: ...,
  } satisfies ApiV1TournamentsRoundsAvailabilitiesCreateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsAvailabilitiesCreate(body);
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
| **requestBody** | `Array<string>` |  | |

### Return type

**Array<string>**

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


## apiV1TournamentsRoundsAvailabilitiesDestroy

> apiV1TournamentsRoundsAvailabilitiesDestroy(roundSeq, tournamentSlug, adjudicators, teams, venues)

Delete class of availabilities

### Example

```ts
import {
  Configuration,
  AvailabilitiesApi,
} from '';
import type { ApiV1TournamentsRoundsAvailabilitiesDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AvailabilitiesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // boolean | Only include adjudicators (optional)
    adjudicators: true,
    // boolean | Only include teams (optional)
    teams: true,
    // boolean | Only include rooms (optional)
    venues: true,
  } satisfies ApiV1TournamentsRoundsAvailabilitiesDestroyRequest;

  try {
    const data = await api.apiV1TournamentsRoundsAvailabilitiesDestroy(body);
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
| **adjudicators** | `boolean` | Only include adjudicators | [Optional] [Defaults to `false`] |
| **teams** | `boolean` | Only include teams | [Optional] [Defaults to `false`] |
| **venues** | `boolean` | Only include rooms | [Optional] [Defaults to `false`] |

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


## apiV1TournamentsRoundsAvailabilitiesList

> Array&lt;string&gt; apiV1TournamentsRoundsAvailabilitiesList(roundSeq, tournamentSlug, adjudicators, teams, venues)

Get all availabilities of the round

### Example

```ts
import {
  Configuration,
  AvailabilitiesApi,
} from '';
import type { ApiV1TournamentsRoundsAvailabilitiesListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AvailabilitiesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // boolean | Only include adjudicators (optional)
    adjudicators: true,
    // boolean | Only include teams (optional)
    teams: true,
    // boolean | Only include rooms (optional)
    venues: true,
  } satisfies ApiV1TournamentsRoundsAvailabilitiesListRequest;

  try {
    const data = await api.apiV1TournamentsRoundsAvailabilitiesList(body);
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
| **adjudicators** | `boolean` | Only include adjudicators | [Optional] [Defaults to `false`] |
| **teams** | `boolean` | Only include teams | [Optional] [Defaults to `false`] |
| **venues** | `boolean` | Only include rooms | [Optional] [Defaults to `false`] |

### Return type

**Array<string>**

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


## apiV1TournamentsRoundsAvailabilitiesPartialUpdate

> Array&lt;string&gt; apiV1TournamentsRoundsAvailabilitiesPartialUpdate(roundSeq, tournamentSlug, requestBody)

Toggle the availabilities of the included objects

### Example

```ts
import {
  Configuration,
  AvailabilitiesApi,
} from '';
import type { ApiV1TournamentsRoundsAvailabilitiesPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AvailabilitiesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Array<string>
    requestBody: ...,
  } satisfies ApiV1TournamentsRoundsAvailabilitiesPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsAvailabilitiesPartialUpdate(body);
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
| **requestBody** | `Array<string>` |  | |

### Return type

**Array<string>**

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


## apiV1TournamentsRoundsAvailabilitiesUpdate

> Array&lt;string&gt; apiV1TournamentsRoundsAvailabilitiesUpdate(roundSeq, tournamentSlug, requestBody)

Mark objects as available

### Example

```ts
import {
  Configuration,
  AvailabilitiesApi,
} from '';
import type { ApiV1TournamentsRoundsAvailabilitiesUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AvailabilitiesApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Array<string>
    requestBody: ...,
  } satisfies ApiV1TournamentsRoundsAvailabilitiesUpdateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsAvailabilitiesUpdate(body);
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
| **requestBody** | `Array<string>` |  | |

### Return type

**Array<string>**

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

