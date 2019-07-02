# The C# API for the Avaya Public Cloud

## Prerequisites 
 1.Net Framework 4.7.2+ (Windows Environment) <br />
 2.msbuild.exe (comes with Visual studio or Visual studio build tools) <br />
 3.Packages need to be installed (can be installed using nuget package manager) <br />
        a.Microsoft.AspNet.WebApi.Client v5.2.7+ <br />
	b.Newtonsoft.Json v12.0.2+		<br />


## Build the solution using below commands from cmd
cd \<path to avayacloud-client.sln\> <br />
<Path to msbuild.exe> avayacloud-client.sln /t:Clean,Build /p:Configuration=Release

## Run the sample client 
avayacloud-client.exe \<https path to spokenabc\> \<spokenabcusername\> \<spokenabcuserpassword\> <br />
e.g. avayacloud-client.exe http://localhost:8081 prov1 spoken@1 <br />
     avayacloud-client.exe https://login.bpo.avaya.com StoreAPIProvisioner <password>