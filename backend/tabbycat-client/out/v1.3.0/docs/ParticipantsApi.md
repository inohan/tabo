# ParticipantsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsMeRetrieve**](ParticipantsApi.md#apiv1tournamentsmeretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/me | Get participant from private URL key |



## apiV1TournamentsMeRetrieve

> ParticipantIdentification apiV1TournamentsMeRetrieve(id, tournamentSlug)

Get participant from private URL key

### Example

```ts
import {
  Configuration,
  ParticipantsApi,
} from '';
import type { ApiV1TournamentsMeRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ParticipantsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsMeRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsMeRetrieve(body);
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
| **tournamentSlug** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ParticipantIdentification**](ParticipantIdentification.md)

### Authorization

[tokenAuth](../README.md#tokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

