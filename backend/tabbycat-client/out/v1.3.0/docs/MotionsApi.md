# MotionsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsMotionsCreate**](MotionsApi.md#apiv1tournamentsmotionscreate) | **POST** /api/v1/tournaments/{tournament_slug}/motions | Create motion |
| [**apiV1TournamentsMotionsCreate2**](MotionsApi.md#apiv1tournamentsmotionscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/motions/{id} | Update motion |
| [**apiV1TournamentsMotionsDestroy**](MotionsApi.md#apiv1tournamentsmotionsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/motions/{id} | Delete motion |
| [**apiV1TournamentsMotionsList**](MotionsApi.md#apiv1tournamentsmotionslist) | **GET** /api/v1/tournaments/{tournament_slug}/motions | List tournament motions |
| [**apiV1TournamentsMotionsPartialUpdate**](MotionsApi.md#apiv1tournamentsmotionspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/motions/{id} | Patch motion |
| [**apiV1TournamentsMotionsRetrieve**](MotionsApi.md#apiv1tournamentsmotionsretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/motions/{id} | Get motion |



## apiV1TournamentsMotionsCreate

> Motion apiV1TournamentsMotionsCreate(tournamentSlug, motion)

Create motion

### Example

```ts
import {
  Configuration,
  MotionsApi,
} from '';
import type { ApiV1TournamentsMotionsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new MotionsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Motion
    motion: ...,
  } satisfies ApiV1TournamentsMotionsCreateRequest;

  try {
    const data = await api.apiV1TournamentsMotionsCreate(body);
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
| **motion** | [Motion](Motion.md) |  | |

### Return type

[**Motion**](Motion.md)

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


## apiV1TournamentsMotionsCreate2

> Motion apiV1TournamentsMotionsCreate2(id, tournamentSlug, motion)

Update motion

### Example

```ts
import {
  Configuration,
  MotionsApi,
} from '';
import type { ApiV1TournamentsMotionsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new MotionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Motion
    motion: ...,
  } satisfies ApiV1TournamentsMotionsCreate2Request;

  try {
    const data = await api.apiV1TournamentsMotionsCreate2(body);
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
| **motion** | [Motion](Motion.md) |  | |

### Return type

[**Motion**](Motion.md)

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


## apiV1TournamentsMotionsDestroy

> apiV1TournamentsMotionsDestroy(id, tournamentSlug)

Delete motion

### Example

```ts
import {
  Configuration,
  MotionsApi,
} from '';
import type { ApiV1TournamentsMotionsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new MotionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsMotionsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsMotionsDestroy(body);
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


## apiV1TournamentsMotionsList

> Array&lt;Motion&gt; apiV1TournamentsMotionsList(tournamentSlug, limit, offset)

List tournament motions

### Example

```ts
import {
  Configuration,
  MotionsApi,
} from '';
import type { ApiV1TournamentsMotionsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new MotionsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsMotionsListRequest;

  try {
    const data = await api.apiV1TournamentsMotionsList(body);
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

[**Array&lt;Motion&gt;**](Motion.md)

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


## apiV1TournamentsMotionsPartialUpdate

> Motion apiV1TournamentsMotionsPartialUpdate(id, tournamentSlug, patchedMotion)

Patch motion

### Example

```ts
import {
  Configuration,
  MotionsApi,
} from '';
import type { ApiV1TournamentsMotionsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new MotionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedMotion (optional)
    patchedMotion: ...,
  } satisfies ApiV1TournamentsMotionsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsMotionsPartialUpdate(body);
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
| **patchedMotion** | [PatchedMotion](PatchedMotion.md) |  | [Optional] |

### Return type

[**Motion**](Motion.md)

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


## apiV1TournamentsMotionsRetrieve

> Motion apiV1TournamentsMotionsRetrieve(id, tournamentSlug)

Get motion

### Example

```ts
import {
  Configuration,
  MotionsApi,
} from '';
import type { ApiV1TournamentsMotionsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new MotionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsMotionsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsMotionsRetrieve(body);
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

[**Motion**](Motion.md)

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

