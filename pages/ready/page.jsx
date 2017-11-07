import React from 'react'
import extensionHelper from '../../src/helpers/extension'
import Api from '../../src/modules/api'

const proPage = "https://raindrop.io/app/#/settings/upgrade"

export default class Page extends React.Component{
	constructor(props){
		super(props);

		this.changeHotkey = this.changeHotkey.bind(this);
		this.showInvite = this.showInvite.bind(this);

		this.state = {
			hotkey:[],
			hotkeyEnabled: true,
			omniboxEnabled: extensionHelper.omniboxIsEnabled(),
			userId: 0,
			isPro: false,
			showInvite: false
		}
	}

	componentDidMount() {
		extensionHelper.getHotKey((key)=>{
			if (key===null)
				return this.setState({hotkeyEnabled:false});

			var parsed = (key||"").split('+').map((k)=>k.trim()).filter((k)=>k)
			this.setState({hotkey:parsed})
		})

		Api.get('user', (json)=>{
			if (json.result)
				this.setState({userId: json.user._id, isPro: json.user.pro})
		})
	}

	renderKeys() {
		var replacer = {
			"command" : "&#8984;",
			"shift" : "&#8679;",
			"option" : "&#8997;"
		}
		var classes = {
			"command" : "command",
			"ctrl" : "command",
			"option" : "command",
			"shift" : "shift"
		}

		var keys = ["command","shift","option"];
		if (this.state.hotkey.length>0)
			keys = this.state.hotkey;

		var items = keys.map((key,index)=>{
			var className="",
				value=key;

			if (replacer[key.toLowerCase()])
				value = replacer[key.toLowerCase()];
			if (classes[key.toLowerCase()])
				className = classes[key.toLowerCase()];

			return (
				<div key={index} className={"key"+(className?"-"+className:"")}
					dangerouslySetInnerHTML={{__html: value}}/>
			);
		})

		return items||null;
	}

	changeHotkey(e) {
		e.preventDefault()
		extensionHelper.openTab(extensionHelper.getHotkeysSettingsPage())
	}

	showInvite(e) {
		e.preventDefault()
		this.setState({showInvite:true});
		setTimeout(()=>window.scrollTo(0,document.body.scrollHeight),0)
	}

	render() {
		var link = "https://raindrop.io/?ref="+this.state.userId,
			status = "Bookmark manager with beautiful interface, fast search and the ability to work together "+link;

		return (
			<div id="page">



			</div>
		);
	}
}