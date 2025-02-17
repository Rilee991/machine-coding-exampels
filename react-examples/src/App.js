import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes as Switch, useNavigate, useLocation } from 'react-router-dom';
// import Main from './amazon-connect-example/Main';
import TimerPractice1 from './Timer/TimerPractice1/TimerPractice1';
import TimerPractice2 from './Timer/TimerPractice2/TimerPractice2';
// import WindowSim from './amazon-connect-example/WindowSim';
// import ProgramCall from './amazon-connect-example/ProgramCall';
// import Autodial from './amazon-connect-example/Autodial';
// import GridComponent from './gridcomponent/GridComponent';
// import NivoBar from './nivobar/NivoBar';
// import Sidebar from './Sidebar/Sidebar';
// import Timer from './Timer/Timer';
// import AutoComplete from './autocomplete/AutoComplete';
// import InterceptorDemo from './axiosinterceptor/InterceptorDemo';
// import TimerApp from './countdowntimer2/TimerApp';
// import ProgressBar from './progressbar3/ProgressBar';
// import ProgressBar from './progressbar2/ProgressBar';
// import StopWatch from './stopwatch/StopWatch';
// import HolyGrail from './holygrail/HolyGrail';
// import CustomUseEffect from './custom-useeffect/CustomUseEffect';
// import InfiniteScroll from './infinitescroller/InfiniteScroll';
// import JobBoard from './jobboard/JobBoard';
// import Calculator from './custom-usememo/Calculator';
// import LikeButton from './likebutton/LikeButton';
// import GridLight from './gridlights/GridLight';
// import LRUCache from './lrucache/LRUCache';
// import PasswordGenerator from './passwordgenerator/PasswordGenerator';
// import ProgressBarApp from './progressbar/ProgressBarApp';
// import EmiCalculator from './emicalculator/EmiCalculator';
// import Timer from './countdowntimer/Timer';
// import Pagination from './pagination/Pagination';


const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [isSidebarToggle, setIsSidebarToggle] = useState(true);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

	// navItems: [],
	// selectedItem: -1,
	// isSidebarOpen: true,
	// isSidebarToggle: true,
	// isSidebarCollapsed: true

	return (
		// {/* <Timer /> */}
		// {/* <Pagination /> */}
		// <EmiCalculator />
		// <PasswordGenerator />
		// <ProgressBarApp />
		// <LRUCache />
		// <GridLight />
		// <Calculator />
		// <LikeButton />
		// <JobBoard />
		// <CustomUseEffect />
		// <InfiniteScroll />
		// <HolyGrail />
		// <StopWatch />
		// <ProgressBar />
		// <ProgressBar />
		// <TimerApp />
		// <AutoComplete />
		// <InterceptorDemo />
		// <GridComponent />
		// <NivoBar />
		// <div style={{ display: "flex", gap: "4px" }}>
		// 	<Sidebar open={isSidebarOpen} isCollapsed={isSidebarCollapsed} />
		// 	<div>Content</div>
		// 	<button style={{ height: "30px"}} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>Toggle Open/Close</button>
		// 	<button style={{ height: "30px"}} onClick={() => setIsSidebarCollapsed(false)}>Expand</button>
		// 	<button style={{ height: "30px"}} onClick={() => setIsSidebarCollapsed(true)}>Collapse</button>
		// </div>
		// <Timer />
		// <WindowSim />
		// <ProgramCall />
		// <Autodial />
		// <Main />
		// <TimerPractice1 />
		<TimerPractice2 />
    );
}

export default App;