@echo off
cls
set LIB_UI=ng-redgrape-ui
set LIB_CORE=ng-redgrape-core

echo.
echo ===============================
echo Build the Library %LIB_UI% for Distribution
echo ===============================
call ng build %LIB_UI% --configuration production

echo.
echo ===============================
echo Build the Library %LIB_CORE% for Distribution
echo ===============================
call ng build %LIB_CORE% --configuration production

echo.
echo ===============================
echo Login to npm
echo ===============================
call npm login

echo.
echo ===============================
echo Publish the Package %LIB_UI%
echo ===============================
call cd dist/%LIB_UI%
call npm publish --access public

echo.
echo ===============================
echo Publish the Package %LIB_CORE%
echo ===============================
echo Are you sure you want to publish %LIB_CORE%? (Y/N)
set /p publish_core=
if /i "%publish_core%"=="Y" (
    call cd dist/%LIB_CORE%
    call npm publish --access public
    echo %LIB_CORE% published successfully.
) else if /i "%publish_core%"=="N" (
    echo Skipping %LIB_CORE% publish.
) else (
    echo Invalid input. Please enter Y or N.
    goto confirm_publish_core
)


echo.
echo ===============================
echo Publishing process completed
echo ===============================
pause

