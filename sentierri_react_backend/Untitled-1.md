
Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git add .
warning: in the working copy of 'sentierri_react_backend/config/config.json', LF will be replaced by CRLF the next time Git touches it

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git commit -m "server config.json before dotenv"
[master 1a810cb] server config.json before dotenv
 8 files changed, 342 insertions(+), 1 deletion(-)
 create mode 100644 sentierri_react/src/components/customers/NewCustomerPage.jsx
 create mode 100644 sentierri_react_backend/.env
 create mode 100644 sentierri_react_backend/controllers/customerController.js
 create mode 100644 sentierri_react_backend/models/customer.js
 create mode 100644 sentierri_react_backend/routes/customerRoutes.js

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git push origin master
Enumerating objects: 33, done.
Counting objects: 100% (33/33), done.   
Delta compression using up to 4 threads 
Compressing objects: 100% (17/17), done.
Writing objects: 100% (20/20), 3.71 KiB | 542.00 KiB/s, done.
Total 20 (delta 11), reused 0 (delta 0), pack-reused 0       
remote: Resolving deltas: 100% (11/11), completed with 11 local objects.
To https://github.com/vagasilac/Sentierri
   1af7c1d..1a810cb  master -> master

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git add .
warning: in the working copy of 'sentierri_react/.gitignore', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sentierri_react_backend/config/config.json', LF will be replaced by CRLF the next time Git touches it

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git commit -m "server config.json before dotenv"
[master c856e9f] server config.json before dotenv
 3 files changed, 30 insertions(+), 15 deletions(-)

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git push origin master
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 4 threads
Compressing objects: 100% (7/7), done.
Writing objects: 100% (8/8), 882 bytes | 441.00 KiB/s, done.
Total 8 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/vagasilac/Sentierri
   1a810cb..c856e9f  master -> master

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git rm --cached sentierri_backend/.env
fatal: pathspec 'sentierri_backend/.env' did not match any files

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ cd sentierri_react

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI/sentierri_react (master)
$ git rm --cached .env
fatal: pathspec '.env' did not match any files

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI/sentierri_react (master)
$ git add .

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI/sentierri_react (master)
$ git commit -m "gitignore to backend"
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        ../sentierri_react_backend/.gitignore

nothing added to commit but untracked files present (use "git add" to track)

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI/sentierri_react (master)
$ git push origin master
Everything up-to-date

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI/sentierri_react (master)
$ cd ..

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git add .
warning: in the working copy of 'sentierri_react_backend/.gitignore', LF will be replaced by CRLF the next time Git touches it

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git commit -m "gitignore to backend"
[master 2cadebf] gitignore to backend
 1 file changed, 2 insertions(+)
 create mode 100644 sentierri_react_backend/.gitignore

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git push origin master
To https://github.com/vagasilac/Sentierri
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://github.com/vagasilac/Sentierri'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git pull
remote: Enumerating objects: 8, done.
remote: Counting objects: 100% (8/8), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 6 (delta 2), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (6/6), 1.18 KiB | 52.00 KiB/s, done.
From https://github.com/vagasilac/Sentierri
   c856e9f..caf7231  master     -> origin/master
 * [new branch]      main       -> origin/main
Merge made by the 'ort' strategy.
 sentierri_react_backend/.env | 5 -----
 1 file changed, 5 deletions(-)
 delete mode 100644 sentierri_react_backend/.env

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ touch .gitignore

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git add .

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git add .

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git commit -m "gitignore to backend"
[master a5085d8] gitignore to backend
 3 files changed, 6 insertions(+), 2 deletions(-)
 create mode 100644 .gitignore
 create mode 100644 sentierri_react_backend/.env
 delete mode 100644 sentierri_react_backend/.gitignore

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git push origin master
Enumerating objects: 14, done.
Counting objects: 100% (14/14), done.
Delta compression using up to 4 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (10/10), 928 bytes | 309.00 KiB/s, done.
Total 10 (delta 4), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (4/4), completed with 2 local objects.
To https://github.com/vagasilac/Sentierri
   caf7231..a5085d8  master -> master

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ npm install dotenv

added 1 package, and audited 92 packages in 875ms

7 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ npm uninstall dotenv

removed 1 package, and audited 91 packages in 751ms

7 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$ git add .
warning: in the working copy of 'sentierri_react/package-lock.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sentierri_react/package.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sentierri_react_backend/models/index.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sentierri_react_backend/config/config.js', LF will be replaced by CRLF the next time Git 
touches it

Laci@DESKTOP-U0T2H5S MINGW64 ~/Documents/CODE/APPS/SENTIERRI (master)
$