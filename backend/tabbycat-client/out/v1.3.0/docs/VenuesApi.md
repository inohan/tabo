# VenuesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsVenueCategoriesCreate**](VenuesApi.md#apiv1tournamentsvenuecategoriescreate) | **POST** /api/v1/tournaments/{tournament_slug}/venue-categories | Create venue category |
| [**apiV1TournamentsVenueCategoriesCreate2**](VenuesApi.md#apiv1tournamentsvenuecategoriescreate2) | **POST** /api/v1/tournaments/{tournament_slug}/venue-categories/{id} | Update venue category |
| [**apiV1TournamentsVenueCategoriesDestroy**](VenuesApi.md#apiv1tournamentsvenuecategoriesdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/venue-categories/{id} | Delete venue category |
| [**apiV1TournamentsVenueCategoriesList**](VenuesApi.md#apiv1tournamentsvenuecategorieslist) | **GET** /api/v1/tournaments/{tournament_slug}/venue-categories | List tournament venue categories |
| [**apiV1TournamentsVenueCategoriesPartialUpdate**](VenuesApi.md#apiv1tournamentsvenuecategoriespartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/venue-categories/{id} | Patch venue category |
| [**apiV1TournamentsVenueCategoriesRetrieve**](VenuesApi.md#apiv1tournamentsvenuecategoriesretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/venue-categories/{id} | Get venue category |
| [**apiV1TournamentsVenuesCheckinCreate**](VenuesApi.md#apiv1tournamentsvenuescheckincreate) | **POST** /api/v1/tournaments/{tournament_slug}/venues/{id}/checkin | Create room checkin identifier |
| [**apiV1TournamentsVenuesCheckinDestroy**](VenuesApi.md#apiv1tournamentsvenuescheckindestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/venues/{id}/checkin | Check out room |
| [**apiV1TournamentsVenuesCheckinPartialUpdate**](VenuesApi.md#apiv1tournamentsvenuescheckinpartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/venues/{id}/checkin | Toggle room checkin status |
| [**apiV1TournamentsVenuesCheckinRetrieve**](VenuesApi.md#apiv1tournamentsvenuescheckinretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/venues/{id}/checkin | Get room checkin status |
| [**apiV1TournamentsVenuesCheckinUpdate**](VenuesApi.md#apiv1tournamentsvenuescheckinupdate) | **PUT** /api/v1/tournaments/{tournament_slug}/venues/{id}/checkin | Check in room |
| [**apiV1TournamentsVenuesCreate**](VenuesApi.md#apiv1tournamentsvenuescreate) | **POST** /api/v1/tournaments/{tournament_slug}/venues | Create room |
| [**apiV1TournamentsVenuesCreate2**](VenuesApi.md#apiv1tournamentsvenuescreate2) | **POST** /api/v1/tournaments/{tournament_slug}/venues/{id} | Update room |
| [**apiV1TournamentsVenuesDestroy**](VenuesApi.md#apiv1tournamentsvenuesdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/venues/{id} | Delete room |
| [**apiV1TournamentsVenuesList**](VenuesApi.md#apiv1tournamentsvenueslist) | **GET** /api/v1/tournaments/{tournament_slug}/venues | List rooms in tournament |
| [**apiV1TournamentsVenuesPartialUpdate**](VenuesApi.md#apiv1tournamentsvenuespartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/venues/{id} | Patch room |
| [**apiV1TournamentsVenuesRetrieve**](VenuesApi.md#apiv1tournamentsvenuesretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/venues/{id} | Get room |



## apiV1TournamentsVenueCategoriesCreate

> VenueCategory apiV1TournamentsVenueCategoriesCreate(tournamentSlug, venueCategory)

Create venue category

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenueCategoriesCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // VenueCategory
    venueCategory: ...,
  } satisfies ApiV1TournamentsVenueCategoriesCreateRequest;

  try {
    const data = await api.apiV1TournamentsVenueCategoriesCreate(body);
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
| **venueCategory** | [VenueCategory](VenueCategory.md) |  | |

### Return type

[**VenueCategory**](VenueCategory.md)

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


## apiV1TournamentsVenueCategoriesCreate2

> VenueCategory apiV1TournamentsVenueCategoriesCreate2(id, tournamentSlug, venueCategory)

Update venue category

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenueCategoriesCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // VenueCategory
    venueCategory: ...,
  } satisfies ApiV1TournamentsVenueCategoriesCreate2Request;

  try {
    const data = await api.apiV1TournamentsVenueCategoriesCreate2(body);
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
| **venueCategory** | [VenueCategory](VenueCategory.md) |  | |

### Return type

[**VenueCategory**](VenueCategory.md)

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


## apiV1TournamentsVenueCategoriesDestroy

> apiV1TournamentsVenueCategoriesDestroy(id, tournamentSlug)

Delete venue category

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenueCategoriesDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsVenueCategoriesDestroyRequest;

  try {
    const data = await api.apiV1TournamentsVenueCategoriesDestroy(body);
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


## apiV1TournamentsVenueCategoriesList

> Array&lt;VenueCategory&gt; apiV1TournamentsVenueCategoriesList(tournamentSlug, limit, offset)

List tournament venue categories

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenueCategoriesListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsVenueCategoriesListRequest;

  try {
    const data = await api.apiV1TournamentsVenueCategoriesList(body);
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

[**Array&lt;VenueCategory&gt;**](VenueCategory.md)

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


## apiV1TournamentsVenueCategoriesPartialUpdate

> VenueCategory apiV1TournamentsVenueCategoriesPartialUpdate(id, tournamentSlug, patchedVenueCategory)

Patch venue category

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenueCategoriesPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedVenueCategory (optional)
    patchedVenueCategory: ...,
  } satisfies ApiV1TournamentsVenueCategoriesPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsVenueCategoriesPartialUpdate(body);
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
| **patchedVenueCategory** | [PatchedVenueCategory](PatchedVenueCategory.md) |  | [Optional] |

### Return type

[**VenueCategory**](VenueCategory.md)

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


## apiV1TournamentsVenueCategoriesRetrieve

> VenueCategory apiV1TournamentsVenueCategoriesRetrieve(id, tournamentSlug)

Get venue category

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenueCategoriesRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsVenueCategoriesRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsVenueCategoriesRetrieve(body);
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

[**VenueCategory**](VenueCategory.md)

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


## apiV1TournamentsVenuesCheckinCreate

> Checkin apiV1TournamentsVenuesCheckinCreate(id, tournamentSlug)

Create room checkin identifier

Creates an identifier

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesCheckinCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsVenuesCheckinCreateRequest;

  try {
    const data = await api.apiV1TournamentsVenuesCheckinCreate(body);
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


## apiV1TournamentsVenuesCheckinDestroy

> Checkin apiV1TournamentsVenuesCheckinDestroy(id, tournamentSlug)

Check out room

Checks out

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesCheckinDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsVenuesCheckinDestroyRequest;

  try {
    const data = await api.apiV1TournamentsVenuesCheckinDestroy(body);
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


## apiV1TournamentsVenuesCheckinPartialUpdate

> Checkin apiV1TournamentsVenuesCheckinPartialUpdate(id, tournamentSlug)

Toggle room checkin status

Toggles the check-in status

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesCheckinPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsVenuesCheckinPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsVenuesCheckinPartialUpdate(body);
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


## apiV1TournamentsVenuesCheckinRetrieve

> Checkin apiV1TournamentsVenuesCheckinRetrieve(id, tournamentSlug)

Get room checkin status

Get checkin status

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesCheckinRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsVenuesCheckinRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsVenuesCheckinRetrieve(body);
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


## apiV1TournamentsVenuesCheckinUpdate

> Checkin apiV1TournamentsVenuesCheckinUpdate(id, tournamentSlug)

Check in room

Checks in

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesCheckinUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsVenuesCheckinUpdateRequest;

  try {
    const data = await api.apiV1TournamentsVenuesCheckinUpdate(body);
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


## apiV1TournamentsVenuesCreate

> Venue apiV1TournamentsVenuesCreate(tournamentSlug, venue)

Create room

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Venue
    venue: ...,
  } satisfies ApiV1TournamentsVenuesCreateRequest;

  try {
    const data = await api.apiV1TournamentsVenuesCreate(body);
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
| **venue** | [Venue](Venue.md) |  | |

### Return type

[**Venue**](Venue.md)

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


## apiV1TournamentsVenuesCreate2

> Venue apiV1TournamentsVenuesCreate2(id, tournamentSlug, venue)

Update room

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Venue
    venue: ...,
  } satisfies ApiV1TournamentsVenuesCreate2Request;

  try {
    const data = await api.apiV1TournamentsVenuesCreate2(body);
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
| **venue** | [Venue](Venue.md) |  | |

### Return type

[**Venue**](Venue.md)

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


## apiV1TournamentsVenuesDestroy

> apiV1TournamentsVenuesDestroy(id, tournamentSlug)

Delete room

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsVenuesDestroyRequest;

  try {
    const data = await api.apiV1TournamentsVenuesDestroy(body);
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


## apiV1TournamentsVenuesList

> Array&lt;Venue&gt; apiV1TournamentsVenuesList(tournamentSlug, limit, offset)

List rooms in tournament

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsVenuesListRequest;

  try {
    const data = await api.apiV1TournamentsVenuesList(body);
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

[**Array&lt;Venue&gt;**](Venue.md)

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


## apiV1TournamentsVenuesPartialUpdate

> Venue apiV1TournamentsVenuesPartialUpdate(id, tournamentSlug, patchedVenue)

Patch room

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedVenue (optional)
    patchedVenue: ...,
  } satisfies ApiV1TournamentsVenuesPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsVenuesPartialUpdate(body);
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
| **patchedVenue** | [PatchedVenue](PatchedVenue.md) |  | [Optional] |

### Return type

[**Venue**](Venue.md)

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


## apiV1TournamentsVenuesRetrieve

> Venue apiV1TournamentsVenuesRetrieve(id, tournamentSlug)

Get room

### Example

```ts
import {
  Configuration,
  VenuesApi,
} from '';
import type { ApiV1TournamentsVenuesRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new VenuesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsVenuesRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsVenuesRetrieve(body);
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

[**Venue**](Venue.md)

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

