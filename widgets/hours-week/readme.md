# Library Hours Main Element
Polymer V3 element for displaying weekly library hours using:
```html
<library-hours-week json_path='path/to/init/file.json'></library-hours-week>`.
```

As referenced in [ucd-lib issue #381 ](https://github.com/UCDavisLibrary/ucd-lib/issues/381)

![mock up design](mockup.jpg "mock up design")

## Setup and Function
This element uses the [iron-ajax](https://www.webcomponents.org/element/PolymerElements/iron-ajax) element to query the Google Calendar API and retrieve and display open hours for the selected week. Since we are only using a public api key to authenticate, Google calendars must be public.

In order to accommodate multiple library departments on a single calendar, an unique id must be assigned for each event series (department) and placed somewhere in the Google Calendar event description field. This id should also be set as the search term property in the event_series field of the init json file along with other relevant API parameters. An example json init file is below:
```json
[{"ajax_id": "lib_shields",
    "url":"https://www.googleapis.com/calendar/v3/calendars/ucdavis.edu_3dtim9248ptf2af2jfpqi6q4fc@group.calendar.google.com/events",
    "params": {"key": "your_public_api_key", "maxResults":"2500"},
    "event_series": [{"title": "Peter J. Shields", "search_term": "shields_main", "type": "library", "url": "https://www.library.ucdavis.edu/library/peter-j-shields/"},
        {"title": "Special Collections", "search_term": "spe_col", "type": "department", "url": "https://www.library.ucdavis.edu/service/researchsupport/"}]
    },
    {"ajax_id": "lib_pse",
        "url":"https://www.googleapis.com/calendar/v3/calendars/ucdavis.edu_j9puvf3qfd2jcj86vpq5nqjmlg@group.calendar.google.com/events",
        "params": {"key": "your_public_api_key", "maxResults":"2500"},
        "event_series": [{"title": "Physical Sciences & Engineering Library", "search_term": "pse_main", "type": "library", "url": "https://www.library.ucdavis.edu/library/physical-sciences-engineering/"}]
    }]
```

This element defines 'normal hours' and 'exceptions' consistently with Google's definitions. Library hours entered into Google as a recurring event (with an id in the description) are treated as normal hours. Any changes made to this series thereafter (deletions or start/end changes) are treated as exceptions. Thus, if two recurring event are set up with the same id in the same calendar, for example academic and summer hours, both will be treated as normal hours.
