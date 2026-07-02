# TournamentsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsCreate**](TournamentsApi.md#apiv1tournamentscreate) | **POST** /api/v1/tournaments | Create tournament |
| [**apiV1TournamentsCreate2**](TournamentsApi.md#apiv1tournamentscreate2) | **POST** /api/v1/tournaments/{tournament_slug} | Change tournament |
| [**apiV1TournamentsDestroy**](TournamentsApi.md#apiv1tournamentsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug} | Delete tournament |
| [**apiV1TournamentsList**](TournamentsApi.md#apiv1tournamentslist) | **GET** /api/v1/tournaments | List tournaments |
| [**apiV1TournamentsPartialUpdate**](TournamentsApi.md#apiv1tournamentspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug} | Patch tournament |
| [**apiV1TournamentsPreferencesBulkCreate**](TournamentsApi.md#apiv1tournamentspreferencesbulkcreate) | **POST** /api/v1/tournaments/{tournament_slug}/preferences/bulk | Update multiple tournament preferences |
| [**apiV1TournamentsPreferencesList**](TournamentsApi.md#apiv1tournamentspreferenceslist) | **GET** /api/v1/tournaments/{tournament_slug}/preferences | List tournament preferences |
| [**apiV1TournamentsPreferencesPartialUpdate**](TournamentsApi.md#apiv1tournamentspreferencespartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/preferences/{id} | Patch tournament preference |
| [**apiV1TournamentsPreferencesRetrieve**](TournamentsApi.md#apiv1tournamentspreferencesretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/preferences/{id} | Get tournament preference |
| [**apiV1TournamentsPreferencesUpdate**](TournamentsApi.md#apiv1tournamentspreferencesupdate) | **PUT** /api/v1/tournaments/{tournament_slug}/preferences/{id} | Modify tournament preference |
| [**apiV1TournamentsRetrieve**](TournamentsApi.md#apiv1tournamentsretrieve) | **GET** /api/v1/tournaments/{tournament_slug} | Get tournament |



## apiV1TournamentsCreate

> Tournament apiV1TournamentsCreate(tournament)

Create tournament

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // Tournament
    tournament: ...,
  } satisfies ApiV1TournamentsCreateRequest;

  try {
    const data = await api.apiV1TournamentsCreate(body);
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
| **tournament** | [Tournament](Tournament.md) |  | |

### Return type

[**Tournament**](Tournament.md)

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


## apiV1TournamentsCreate2

> Tournament apiV1TournamentsCreate2(tournamentSlug, tournament)

Change tournament

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Tournament
    tournament: ...,
  } satisfies ApiV1TournamentsCreate2Request;

  try {
    const data = await api.apiV1TournamentsCreate2(body);
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
| **tournament** | [Tournament](Tournament.md) |  | |

### Return type

[**Tournament**](Tournament.md)

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


## apiV1TournamentsDestroy

> apiV1TournamentsDestroy(tournamentSlug)

Delete tournament

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsDestroy(body);
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


## apiV1TournamentsList

> Array&lt;Tournament&gt; apiV1TournamentsList(limit, offset)

List tournaments

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsListRequest;

  try {
    const data = await api.apiV1TournamentsList(body);
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

### Return type

[**Array&lt;Tournament&gt;**](Tournament.md)

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


## apiV1TournamentsPartialUpdate

> Tournament apiV1TournamentsPartialUpdate(tournamentSlug, patchedTournament)

Patch tournament

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedTournament (optional)
    patchedTournament: ...,
  } satisfies ApiV1TournamentsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsPartialUpdate(body);
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
| **patchedTournament** | [PatchedTournament](PatchedTournament.md) |  | [Optional] |

### Return type

[**Tournament**](Tournament.md)

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


## apiV1TournamentsPreferencesBulkCreate

> Preference apiV1TournamentsPreferencesBulkCreate(tournamentSlug, preference)

Update multiple tournament preferences

Update multiple preferences at once  this is a long method because we ensure everything is valid before actually persisting the changes

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsPreferencesBulkCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Preference
    preference: ...,
  } satisfies ApiV1TournamentsPreferencesBulkCreateRequest;

  try {
    const data = await api.apiV1TournamentsPreferencesBulkCreate(body);
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
| **preference** | [Preference](Preference.md) |  | |

### Return type

[**Preference**](Preference.md)

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


## apiV1TournamentsPreferencesList

> Array&lt;Preference&gt; apiV1TournamentsPreferencesList(tournamentSlug, limit, offset)

List tournament preferences

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsPreferencesListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsPreferencesListRequest;

  try {
    const data = await api.apiV1TournamentsPreferencesList(body);
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

[**Array&lt;Preference&gt;**](Preference.md)

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


## apiV1TournamentsPreferencesPartialUpdate

> Preference apiV1TournamentsPreferencesPartialUpdate(id, tournamentSlug, patchedPreference)

Patch tournament preference

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsPreferencesPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // number | A unique integer value identifying this tournament preference.
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedPreference (optional)
    patchedPreference: ...,
  } satisfies ApiV1TournamentsPreferencesPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsPreferencesPartialUpdate(body);
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
| **id** | `number` | A unique integer value identifying this tournament preference. | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **patchedPreference** | [PatchedPreference](PatchedPreference.md) |  | [Optional] |

### Return type

[**Preference**](Preference.md)

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


## apiV1TournamentsPreferencesRetrieve

> Preference apiV1TournamentsPreferencesRetrieve(id, tournamentSlug)

Get tournament preference

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsPreferencesRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // number | A unique integer value identifying this tournament preference.
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsPreferencesRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsPreferencesRetrieve(body);
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
| **id** | `number` | A unique integer value identifying this tournament preference. | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**Preference**](Preference.md)

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


## apiV1TournamentsPreferencesUpdate

> Preference apiV1TournamentsPreferencesUpdate(id, tournamentSlug, preference)

Modify tournament preference

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsPreferencesUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // number | A unique integer value identifying this tournament preference.
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Preference
    preference: ...,
  } satisfies ApiV1TournamentsPreferencesUpdateRequest;

  try {
    const data = await api.apiV1TournamentsPreferencesUpdate(body);
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
| **id** | `number` | A unique integer value identifying this tournament preference. | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **preference** | [Preference](Preference.md) |  | |

### Return type

[**Preference**](Preference.md)

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


## apiV1TournamentsRetrieve

> Tournament apiV1TournamentsRetrieve(tournamentSlug)

Get tournament

### Example

```ts
import {
  Configuration,
  TournamentsApi,
} from '';
import type { ApiV1TournamentsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TournamentsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsRetrieve(body);
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

### Return type

[**Tournament**](Tournament.md)

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

