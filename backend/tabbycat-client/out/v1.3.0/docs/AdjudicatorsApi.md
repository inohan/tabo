# AdjudicatorsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsAdjudicatorsCheckinCreate**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorscheckincreate) | **POST** /api/v1/tournaments/{tournament_slug}/adjudicators/{id}/checkin | Create adjudicator checkin identifier |
| [**apiV1TournamentsAdjudicatorsCheckinDestroy**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorscheckindestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/adjudicators/{id}/checkin | Check out adjudicator |
| [**apiV1TournamentsAdjudicatorsCheckinPartialUpdate**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorscheckinpartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/adjudicators/{id}/checkin | Toggle adjudicator checkin status |
| [**apiV1TournamentsAdjudicatorsCheckinRetrieve**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorscheckinretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/adjudicators/{id}/checkin | Get adjudicator checkin status |
| [**apiV1TournamentsAdjudicatorsCheckinUpdate**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorscheckinupdate) | **PUT** /api/v1/tournaments/{tournament_slug}/adjudicators/{id}/checkin | Check in adjudicator |
| [**apiV1TournamentsAdjudicatorsCreate**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorscreate) | **POST** /api/v1/tournaments/{tournament_slug}/adjudicators | Create adjudicator |
| [**apiV1TournamentsAdjudicatorsCreate2**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/adjudicators/{id} | Update adjudicator |
| [**apiV1TournamentsAdjudicatorsDestroy**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/adjudicators/{id} | Delete adjudicator |
| [**apiV1TournamentsAdjudicatorsList**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorslist) | **GET** /api/v1/tournaments/{tournament_slug}/adjudicators | Get adjudicators in tournament |
| [**apiV1TournamentsAdjudicatorsPartialUpdate**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/adjudicators/{id} | Patch adjudicator |
| [**apiV1TournamentsAdjudicatorsRetrieve**](AdjudicatorsApi.md#apiv1tournamentsadjudicatorsretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/adjudicators/{id} | Get adjudicator |



## apiV1TournamentsAdjudicatorsCheckinCreate

> Checkin apiV1TournamentsAdjudicatorsCheckinCreate(id, tournamentSlug)

Create adjudicator checkin identifier

Creates an identifier

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsCheckinCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsAdjudicatorsCheckinCreateRequest;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsCheckinCreate(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**Checkin**](Checkin.md)

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


## apiV1TournamentsAdjudicatorsCheckinDestroy

> Checkin apiV1TournamentsAdjudicatorsCheckinDestroy(id, tournamentSlug)

Check out adjudicator

Checks out

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsCheckinDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsAdjudicatorsCheckinDestroyRequest;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsCheckinDestroy(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**Checkin**](Checkin.md)

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


## apiV1TournamentsAdjudicatorsCheckinPartialUpdate

> Checkin apiV1TournamentsAdjudicatorsCheckinPartialUpdate(id, tournamentSlug)

Toggle adjudicator checkin status

Toggles the check-in status

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsCheckinPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsAdjudicatorsCheckinPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsCheckinPartialUpdate(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**Checkin**](Checkin.md)

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


## apiV1TournamentsAdjudicatorsCheckinRetrieve

> Checkin apiV1TournamentsAdjudicatorsCheckinRetrieve(id, tournamentSlug)

Get adjudicator checkin status

Get checkin status

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsCheckinRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsAdjudicatorsCheckinRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsCheckinRetrieve(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**Checkin**](Checkin.md)

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


## apiV1TournamentsAdjudicatorsCheckinUpdate

> Checkin apiV1TournamentsAdjudicatorsCheckinUpdate(id, tournamentSlug)

Check in adjudicator

Checks in

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsCheckinUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsAdjudicatorsCheckinUpdateRequest;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsCheckinUpdate(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**Checkin**](Checkin.md)

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


## apiV1TournamentsAdjudicatorsCreate

> Adjudicator apiV1TournamentsAdjudicatorsCreate(tournamentSlug, adjudicator)

Create adjudicator

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Adjudicator
    adjudicator: ...,
  } satisfies ApiV1TournamentsAdjudicatorsCreateRequest;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsCreate(body);
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
| **adjudicator** | [Adjudicator](Adjudicator.md) |  | |

### Return type

[**Adjudicator**](Adjudicator.md)

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


## apiV1TournamentsAdjudicatorsCreate2

> Adjudicator apiV1TournamentsAdjudicatorsCreate2(id, tournamentSlug, adjudicator)

Update adjudicator

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Adjudicator
    adjudicator: ...,
  } satisfies ApiV1TournamentsAdjudicatorsCreate2Request;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsCreate2(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **adjudicator** | [Adjudicator](Adjudicator.md) |  | |

### Return type

[**Adjudicator**](Adjudicator.md)

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


## apiV1TournamentsAdjudicatorsDestroy

> apiV1TournamentsAdjudicatorsDestroy(id, tournamentSlug)

Delete adjudicator

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsAdjudicatorsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsDestroy(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
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


## apiV1TournamentsAdjudicatorsList

> Array&lt;Adjudicator&gt; apiV1TournamentsAdjudicatorsList(tournamentSlug, _break, limit, offset)

Get adjudicators in tournament

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // boolean | Only include breaking adjudicators (optional)
    _break: true,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsAdjudicatorsListRequest;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsList(body);
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
| **_break** | `boolean` | Only include breaking adjudicators | [Optional] [Defaults to `false`] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Adjudicator&gt;**](Adjudicator.md)

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


## apiV1TournamentsAdjudicatorsPartialUpdate

> Adjudicator apiV1TournamentsAdjudicatorsPartialUpdate(id, tournamentSlug, patchedAdjudicator)

Patch adjudicator

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedAdjudicator (optional)
    patchedAdjudicator: ...,
  } satisfies ApiV1TournamentsAdjudicatorsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsPartialUpdate(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **patchedAdjudicator** | [PatchedAdjudicator](PatchedAdjudicator.md) |  | [Optional] |

### Return type

[**Adjudicator**](Adjudicator.md)

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


## apiV1TournamentsAdjudicatorsRetrieve

> Adjudicator apiV1TournamentsAdjudicatorsRetrieve(id, tournamentSlug)

Get adjudicator

### Example

```ts
import {
  Configuration,
  AdjudicatorsApi,
} from '';
import type { ApiV1TournamentsAdjudicatorsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new AdjudicatorsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsAdjudicatorsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsAdjudicatorsRetrieve(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**Adjudicator**](Adjudicator.md)

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

