# InstitutionsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1InstitutionsCreate**](InstitutionsApi.md#apiv1institutionscreate) | **POST** /api/v1/institutions | Create institution |
| [**apiV1InstitutionsCreate2**](InstitutionsApi.md#apiv1institutionscreate2) | **POST** /api/v1/institutions/{id} | Update institution |
| [**apiV1InstitutionsDestroy**](InstitutionsApi.md#apiv1institutionsdestroy) | **DELETE** /api/v1/institutions/{id} | Delete institution |
| [**apiV1InstitutionsList**](InstitutionsApi.md#apiv1institutionslist) | **GET** /api/v1/institutions | List all institutions |
| [**apiV1InstitutionsPartialUpdate**](InstitutionsApi.md#apiv1institutionspartialupdate) | **PATCH** /api/v1/institutions/{id} | Patch institution |
| [**apiV1InstitutionsRetrieve**](InstitutionsApi.md#apiv1institutionsretrieve) | **GET** /api/v1/institutions/{id} | Get institution |
| [**apiV1TournamentsInstitutionsList**](InstitutionsApi.md#apiv1tournamentsinstitutionslist) | **GET** /api/v1/tournaments/{tournament_slug}/institutions | List institutions in tournament |



## apiV1InstitutionsCreate

> Institution apiV1InstitutionsCreate(institution)

Create institution

### Example

```ts
import {
  Configuration,
  InstitutionsApi,
} from '';
import type { ApiV1InstitutionsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new InstitutionsApi(config);

  const body = {
    // Institution
    institution: ...,
  } satisfies ApiV1InstitutionsCreateRequest;

  try {
    const data = await api.apiV1InstitutionsCreate(body);
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
| **institution** | [Institution](Institution.md) |  | |

### Return type

[**Institution**](Institution.md)

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


## apiV1InstitutionsCreate2

> Institution apiV1InstitutionsCreate2(id, institution)

Update institution

### Example

```ts
import {
  Configuration,
  InstitutionsApi,
} from '';
import type { ApiV1InstitutionsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new InstitutionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // Institution
    institution: ...,
  } satisfies ApiV1InstitutionsCreate2Request;

  try {
    const data = await api.apiV1InstitutionsCreate2(body);
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
| **institution** | [Institution](Institution.md) |  | |

### Return type

[**Institution**](Institution.md)

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


## apiV1InstitutionsDestroy

> apiV1InstitutionsDestroy(id)

Delete institution

### Example

```ts
import {
  Configuration,
  InstitutionsApi,
} from '';
import type { ApiV1InstitutionsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new InstitutionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
  } satisfies ApiV1InstitutionsDestroyRequest;

  try {
    const data = await api.apiV1InstitutionsDestroy(body);
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


## apiV1InstitutionsList

> Array&lt;Institution&gt; apiV1InstitutionsList(limit, offset, region)

List all institutions

### Example

```ts
import {
  Configuration,
  InstitutionsApi,
} from '';
import type { ApiV1InstitutionsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new InstitutionsApi(config);

  const body = {
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
    // string | Only include institutions from the region (optional)
    region: region_example,
  } satisfies ApiV1InstitutionsListRequest;

  try {
    const data = await api.apiV1InstitutionsList(body);
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
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |
| **region** | `string` | Only include institutions from the region | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Institution&gt;**](Institution.md)

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


## apiV1InstitutionsPartialUpdate

> Institution apiV1InstitutionsPartialUpdate(id, patchedInstitution)

Patch institution

### Example

```ts
import {
  Configuration,
  InstitutionsApi,
} from '';
import type { ApiV1InstitutionsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new InstitutionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // PatchedInstitution (optional)
    patchedInstitution: ...,
  } satisfies ApiV1InstitutionsPartialUpdateRequest;

  try {
    const data = await api.apiV1InstitutionsPartialUpdate(body);
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
| **patchedInstitution** | [PatchedInstitution](PatchedInstitution.md) |  | [Optional] |

### Return type

[**Institution**](Institution.md)

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


## apiV1InstitutionsRetrieve

> Institution apiV1InstitutionsRetrieve(id)

Get institution

### Example

```ts
import {
  Configuration,
  InstitutionsApi,
} from '';
import type { ApiV1InstitutionsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new InstitutionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
  } satisfies ApiV1InstitutionsRetrieveRequest;

  try {
    const data = await api.apiV1InstitutionsRetrieve(body);
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

### Return type

[**Institution**](Institution.md)

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


## apiV1TournamentsInstitutionsList

> Array&lt;PerTournamentInstitution&gt; apiV1TournamentsInstitutionsList(tournamentSlug, limit, offset, region)

List institutions in tournament

### Example

```ts
import {
  Configuration,
  InstitutionsApi,
} from '';
import type { ApiV1TournamentsInstitutionsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new InstitutionsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
    // string | Only include institutions from the region (optional)
    region: region_example,
  } satisfies ApiV1TournamentsInstitutionsListRequest;

  try {
    const data = await api.apiV1TournamentsInstitutionsList(body);
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
| **region** | `string` | Only include institutions from the region | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;PerTournamentInstitution&gt;**](PerTournamentInstitution.md)

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

