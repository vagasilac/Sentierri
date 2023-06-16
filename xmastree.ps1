function Get-Tree([string]$path = ".", [int]$level = 
0) {
>>     $indent = "  " * $level
>>     $lastIndent = if ($level -gt 0) { "  " * ($level - 1) } else { "" }
>>     $files = Get-ChildItem -Path $path | Where-Object { $_.Name -ne "node_modules" }
>>     for ($i = 0; $i -lt $files.Count; $i++) {
>>         $file = $files[$i]
>>         if ($i -eq $files.Count - 1) {
>>             Write-Host "$lastIndent└──$file"
>>             if ($file.PSIsContainer) {
>>                 Get-Tree $file.FullName ($level + 1)
>>             }
>>         } else {
>>             Write-Host "$indent├──$file"
>>             if ($file.PSIsContainer) {
>>                 Get-Tree $file.FullName ($level + 1)
>>             }
>>         }
>>     }
>> }
>>
>> Get-Tree