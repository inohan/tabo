# RoundsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsRoundsCreate**](RoundsApi.md#apiv1tournamentsroundscreate) | **POST** /api/v1/tournaments/{tournament_slug}/rounds | Create round |
| [**apiV1TournamentsRoundsCreate2**](RoundsApi.md#apiv1tournamentsroundscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq} | Update round |
| [**apiV1TournamentsRoundsDestroy**](RoundsApi.md#apiv1tournamentsroundsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq} | Delete round |
| [**apiV1TournamentsRoundsList**](RoundsApi.md#apiv1tournamentsroundslist) | **GET** /api/v1/tournaments/{tournament_slug}/rounds | List rounds of a tournament |
| [**apiV1TournamentsRoundsPartialUpdate**](RoundsApi.md#apiv1tournamentsroundspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq} | Patch round |
| [**apiV1TournamentsRoundsRetrieve**](RoundsApi.md#apiv1tournamentsroundsretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq} | Get round |



## apiV1TournamentsRoundsCreate

> Round apiV1TournamentsRoundsCreate(tournamentSlug, round)

Create round

### Example

```ts
import {
  Configuration,
  RoundsApi,
} from '';
import type { ApiV1TournamentsRoundsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new RoundsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Round
    round: ...,
  } satisfies ApiV1TournamentsRoundsCreateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsCreate(body);
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
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **round** | [Round](Round.md) |  | |

### Return type

[**Round**](Round.md)

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


## apiV1TournamentsRoundsCreate2

> Round apiV1TournamentsRoundsCreate2(roundSeq, tournamentSlug, round)

Update round

### Example

```ts
import {
  Configuration,
  RoundsApi,
} from '';
import type { ApiV1TournamentsRoundsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new RoundsApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Round
    round: ...,
  } satisfies ApiV1TournamentsRoundsCreate2Request;

  try {
    const data = await api.apiV1TournamentsRoundsCreate2(body);
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
| **round** | [Round](Round.md) |  | |

### Return type

[**Round**](Round.md)

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


## apiV1TournamentsRoundsDestroy

> apiV1TournamentsRoundsDestroy(roundSeq, tournamentSlug)

Delete round

### Example

```ts
import {
  Configuration,
  RoundsApi,
} from '';
import type { ApiV1TournamentsRoundsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new RoundsApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRoundsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsRoundsDestroy(body);
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


## apiV1TournamentsRoundsList

> Array&lt;Round&gt; apiV1TournamentsRoundsList(tournamentSlug, limit, offset)

List rounds of a tournament

### Example

```ts
import {
  Configuration,
  RoundsApi,
} from '';
import type { ApiV1TournamentsRoundsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new RoundsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsRoundsListRequest;

  try {
    const data = await api.apiV1TournamentsRoundsList(body);
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
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Round&gt;**](Round.md)

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


## apiV1TournamentsRoundsPartialUpdate

> Round apiV1TournamentsRoundsPartialUpdate(roundSeq, tournamentSlug, patchedRound)

Patch round

### Example

```ts
import {
  Configuration,
  RoundsApi,
} from '';
import type { ApiV1TournamentsRoundsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new RoundsApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedRound (optional)
    patchedRound: ...,
  } satisfies ApiV1TournamentsRoundsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPartialUpdate(body);
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
| **patchedRound** | [PatchedRound](PatchedRound.md) |  | [Optional] |

### Return type

[**Round**](Round.md)

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


## apiV1TournamentsRoundsRetrieve

> Round apiV1TournamentsRoundsRetrieve(roundSeq, tournamentSlug)

Get round

### Example

```ts
import {
  Configuration,
  RoundsApi,
} from '';
import type { ApiV1TournamentsRoundsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new RoundsApi(config);

  const body = {
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRoundsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsRoundsRetrieve(body);
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

[**Round**](Round.md)

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

