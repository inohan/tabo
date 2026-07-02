# ApiApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsWebpushRegisterCreate**](ApiApi.md#apiv1tournamentswebpushregistercreate) | **POST** /api/v1/tournaments/{tournament_slug}/webpush/register |  |



## apiV1TournamentsWebpushRegisterCreate

> ParticipantWebPushDevice apiV1TournamentsWebpushRegisterCreate(tournamentSlug, participantWebPushDevice)



### Example

```ts
import {
  Configuration,
  ApiApi,
} from '';
import type { ApiV1TournamentsWebpushRegisterCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ApiApi(config);

  const body = {
    // string
    tournamentSlug: tournamentSlug_example,
    // ParticipantWebPushDevice
    participantWebPushDevice: ...,
  } satisfies ApiV1TournamentsWebpushRegisterCreateRequest;

  try {
    const data = await api.apiV1TournamentsWebpushRegisterCreate(body);
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
| **tournamentSlug** | `string` |  | [Defaults to `undefined`] |
| **participantWebPushDevice** | [ParticipantWebPushDevice](ParticipantWebPushDevice.md) |  | |

### Return type

[**ParticipantWebPushDevice**](ParticipantWebPushDevice.md)

### Authorization

[tokenAuth](../README.md#tokenAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

