PowerShell Extension v2023.6.0
Copyright (c) Microsoft Corporation.


PS C:\Users\Laci\Documents\CODE\APPS\SENTIERRI> .\Get-Tree.ps1
At C:\Users\Laci\Documents\CODE\APPS\SENTIERRI\Get-Tree.ps1:13 char:46
+             Write-Host "$indentâ”śâ”€â”€$file"
+                                              ~
The string is missing the terminator: ".
At C:\Users\Laci\Documents\CODE\APPS\SENTIERRI\Get-Tree.ps1:12 char:16
+         } else {
+                ~
Missing closing '}' in statement block or type definition.
At C:\Users\Laci\Documents\CODE\APPS\SENTIERRI\Get-Tree.ps1:5 char:45
+     for ($i = 0; $i -lt $files.Count; $i++) {
+                                             ~
Missing closing '}' in statement block or type definition.
At C:\Users\Laci\Documents\CODE\APPS\SENTIERRI\Get-Tree.ps1:1 char:57
+ function Get-Tree([string]$path = ".", [int]$level = 0) {
+                                                         ~
Missing closing '}' in statement block or type definition.
    + CategoryInfo          : ParserError: (:) [], ParseException
    + FullyQualifiedErrorId : TerminatorExpectedAtEndOfString

PS C:\Users\Laci\Documents\CODE\APPS\SENTIERRI>







