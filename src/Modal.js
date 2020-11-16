import React from 'react'
class Modal extends React.Component {


	constructor(props) {
		super(props);

		this.outerStyle = {
			position: "fixed",
			top: '0',
			left: '0',
			width: "100%",
			height: "100%",
			overflow: "auto",
			zIndex: 1000
		};

		// default style
		this.style = {
			modal: {
				position: "relative",
				width: '620px',
				height:'370px',
				padding: 20,
				boxSizing: "border-box",
				backgroundColor: "#fff",
				margin: "40px auto",
				borderRadius: 3,
				zIndex: 2,
				textAlign: "left",
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
               // overflowX:'hidden',
				...this.props.style.modal
			},
			overlay: {
				position:"absolute",
				//overflow: "scroll",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0,0,0,0)",
				...this.props.style.overlay
			}
		};
	}

	// render modal
	render() {
		return (
			<div
				style={{
					overflow: 'hidden',
					...this.outerStyle,
					display: this.props.isModalOpen ? "block" : "none"
				}}
			>
				<div style={this.style.overlay} onClick={this.props.closeModal} />
				<div onClick={this.props.closeModal} />
				<div style={this.style.modal}>{this.props.children}</div>
				<div  style={{
					 width: 0,
					 height: 0,
					 borderLeft: '8px solid transparent',
					 borderRight: '8px solid transparent',
					 borderTop: '15px solid white',
					 top: '-41px',
                     position: 'relative',
					 left: '340px',
					 zIndex:'999'

				}}></div>
			</div>
		);
	}
}

export default Modal;