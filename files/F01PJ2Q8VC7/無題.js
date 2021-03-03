{
  "title": "Foot pedal vim mapping",
  "rules": [
    {
      "description": "Foot pedal vim mapping",
      "manipulators": [
        {
          "type": "basic",
          "from": {
            "key_code": "left_option"
          },
          "to": [
            {
              "set_variable": {
                "name": "vi_mode",
                "value": 1
              }
            }
          ],
          "to_after_key_up": [
            {
              "set_variable": {
                "name": "vi_mode",
                "value": 0
              }
            }
          ]
        },
        {
          "type": "basic",
          "from": {
            "key_code": "h"
          },
          "to": [
            {
              "key_code": "left_arrow"
            }
          ],
          "conditions": [
            {
              "type": "variable_if",
              "name": "vi_mode",
              "value": 1
            }
          ]
        },
        {
          "type": "basic",
          "from": {
            "key_code": "j"
          },
          "to": [
            {
              "key_code": "down_arrow"
            }
          ],
          "conditions": [
            {
              "type": "variable_if",
              "name": "vi_mode",
              "value": 1
            }
          ]
        },
        {
          "type": "basic",
          "from": {
            "key_code": "k"
          },
          "to": [
            {
              "key_code": "up_arrow"
            }
          ],
          "conditions": [
            {
              "type": "variable_if",
              "name": "vi_mode",
              "value": 1
            }
          ]
        },
        {
          "type": "basic",
          "from": {
            "key_code": "l"
          },
          "to": [
            {
              "key_code": "right_arrow"
            }
          ],
          "conditions": [
            {
              "type": "variable_if",
              "name": "vi_mode",
              "value": 1
            }
          ]
        }
      ]
    }
  ]
}
