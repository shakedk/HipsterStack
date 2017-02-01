import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import DevTools from 'mobx-react-devtools';

import uiState from "state/uiState"
import dataAPI from "data/dataAPI"
import {loadAllDataSets, getDataSet} from 'data/dataStore';
import {observer} from 'mobx-react';

import { startRouter } from 'router';

import ItemMapComponent from "itemMap/ItemMapComponent";

@observer
class App extends Component {
	constructor(){
		super();
		startRouter();
		this.loadData();
	}

	loadData(){
		loadAllDataSets().then((dataSets)=>{
			uiState.dataLoaded = true;
		})
	}

	render() {
		return (
			<div>
				<h1>Selection: {dataAPI.selectedItemLabel}</h1>
				{dataAPI.dataReady ?
					<ItemMapComponent items={dataAPI.items}/>
					:
					<h2>Loading…</h2>
				}
			</div>
		);
	}
};

export default App;