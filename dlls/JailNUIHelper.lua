RegisterNUICallback('jailExample', function(data, cb)
	--data is json so if you had an 'field' part in the json sent you could get it by data.field
	--This sends stuff to your c# from the js
	--So trigger an event here
	Citizen.Trace('jail example lua')
	TriggerEvent('DOJ.Jail.NUI')
	cb('ok')
end)

RegisterNUICallback('jailNuiCallback', function(data, cb)
	--data is json so if you had an 'field' part in the json sent you could get it by data.field
	--This sends stuff to your c# from the js
	--So trigger an event here
	Citizen.Trace('jail nui callback')
	TriggerEvent('DOJ.Jail.Submitted', data.id, data.time, data.reason)
	TriggerServerEvent('txaLogger:CommandExecuted', 'jailed Player ID ' .. data.id .. " for " .. data.time .. " seconds. Reason: " .. data.reason)
	cb('ok')
end)


RegisterNUICallback('closeUI', function(data, cb)
	Citizen.Trace('Closing')
	TriggerEvent('DOJ.Jail.NUI')
	cb('ok')
end)

RegisterCommand('jail', function()
	Citizen.Trace('jail nui callback')
	TriggerEvent('DOJ.Jail.NUI')
	cb('ok')
end)

Citizen.CreateThread(function()
    TriggerEvent("chat:addSuggestion", '/jail', 'Opens the JAIL UI')
end)