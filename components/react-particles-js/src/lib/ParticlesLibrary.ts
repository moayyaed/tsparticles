/// <reference path="../../typings/index.d.ts" />

import {
	ICanvasParam,
	IParams,
	deepExtend,
	defaultParams,
	Interact,
	Modes,
	Particle,
	ParticleManager,
	Vendors} from '.';

export default class ParticlesLibrary{

	canvas: ICanvasParam;

	params: IParams;
	particleManager: ParticleManager;
	interact: Interact;
	modes: Modes;
	vendors: Vendors;

	constructor( canvasElement: HTMLCanvasElement, params?: any ){
		this.loadParameters( params );
		this.loadCanvas( canvasElement );

		this.extendParams( canvasElement );

		this.interact = new Interact( this.params, this );
		this.modes = new Modes( this.params, this );
		this.vendors = new Vendors( this.params, this );
		this.particleManager = new ParticleManager( this.params, this.interact, this.modes, this.vendors, this );
	}

	loadParameters( params?: any ): void{
		deepExtend( defaultParams, params );
		this.params = defaultParams;
	}

	loadCanvas( canvasElement: HTMLCanvasElement ){
		this.canvas = {
			element: canvasElement,
			width: canvasElement.offsetWidth,
			height: canvasElement.offsetHeight
		}
	}

	start(): void{
		this.params.fn.vendors.eventsListeners();
		this.params.fn.vendors.start();
	}

	destroy(): void{
		this.detachListeners();
		this.vendors.detachListeners();
	}

	detachListeners(): void{
		window.removeEventListener( 'resize', this.onWindowResize );
	}

	extendParams( canvasElement: HTMLCanvasElement ): void{
		this.extendTmpDefinition();
		this.onWindowResize = this.onWindowResize.bind( this );
		this.retinaInit = this.retinaInit.bind( this );
		this.canvasInit = this.canvasInit.bind( this );
		this.canvasSize = this.canvasSize.bind( this );
		this.canvasPaint = this.canvasPaint.bind( this );
		this.canvasClear = this.canvasClear.bind( this );
		this.extendRetinaFunctionDefinition();
		this.extendCanvasFunctionDefinition();
		this.extendParticleFunctionDefinition();
	}

	extendTmpDefinition(): void{
		this.params.tmp.obj = {
			size_value: this.params.particles.size.value,
			size_anim_speed: this.params.particles.size.anim.speed,
			move_speed: this.params.particles.move.speed,
			line_linked_distance: this.params.particles.line_linked.distance,
			line_linked_width: this.params.particles.line_linked.width,
			mode_grab_distance: this.params.interactivity.modes.grab.distance,
			mode_bubble_distance: this.params.interactivity.modes.bubble.distance,
			mode_bubble_size: this.params.interactivity.modes.bubble.size,
			mode_repulse_distance: this.params.interactivity.modes.repulse.distance
		};
	}

	extendRetinaFunctionDefinition(): void{
		this.params.fn.retinaInit = this.retinaInit;
	}

	retinaInit(): void{

		let {canvas} = this;

		if( this.params.retina_detect && window.devicePixelRatio > 1 ){
			canvas.pxratio = window.devicePixelRatio;
			this.params.tmp.retina = true;

			canvas.width = canvas.element.offsetWidth * canvas.pxratio;
			canvas.height = canvas.element.offsetHeight * canvas.pxratio;

			this.params.particles.size.value = this.params.tmp.obj.size_value * canvas.pxratio;
			this.params.particles.size.anim.speed = this.params.tmp.obj.size_anim_speed * canvas.pxratio;
			this.params.particles.move.speed = this.params.tmp.obj.move_speed * canvas.pxratio;
			this.params.particles.line_linked.distance = this.params.tmp.obj.line_linked_distance * canvas.pxratio;
			this.params.interactivity.modes.grab.distance = this.params.tmp.obj.mode_grab_distance * canvas.pxratio;
			this.params.interactivity.modes.bubble.distance = this.params.tmp.obj.mode_bubble_distance * canvas.pxratio;
			this.params.particles.line_linked.width = this.params.tmp.obj.line_linked_width * canvas.pxratio;
			this.params.interactivity.modes.bubble.size = this.params.tmp.obj.mode_bubble_size * canvas.pxratio;
			this.params.interactivity.modes.repulse.distance = this.params.tmp.obj.mode_repulse_distance * canvas.pxratio;

		}else{
			canvas.pxratio = 1;
			this.params.tmp.retina = false;
		}
	}

	extendCanvasFunctionDefinition(): void{
		this.params.fn.canvasInit = this.canvasInit;
		this.params.fn.canvasSize = this.canvasSize;
		this.params.fn.canvasPaint = this.canvasPaint;
		this.params.fn.canvasClear = this.canvasClear;
	}

	canvasInit(): void{

		let {canvas} = this;

		canvas.ctx = canvas.element.getContext( '2d' );
	}

	canvasSize(): void{

		let {canvas} = this;

		canvas.element.width = canvas.width;
		canvas.element.height = canvas.height;

		if( this.params && this.params.interactivity.events.resize ){
			window.addEventListener( 'resize', this.onWindowResize );
		}
	}

	canvasPaint(): void{

		let {canvas} = this;

		canvas.ctx.fillRect( 0, 0, canvas.width, canvas.height );
	}

	canvasClear(): void{

		let {canvas} = this;

		canvas.ctx.clearRect( 0, 0, canvas.width, canvas.height );
	}

	extendParticleFunctionDefinition(): void{
		this.params.fn.particle = Particle;
	}

	public onWindowResize(): void{

		let {canvas} = this;

		canvas.width = canvas.element.offsetWidth;
		canvas.height = canvas.element.offsetHeight;

		if( this.params.tmp.retina ){
			canvas.width *= canvas.pxratio;
			canvas.height *= canvas.pxratio;
		}

		canvas.element.width = canvas.width;
		canvas.element.height = canvas.height;

		if( !this.params.particles.move.enable ){
			this.params.fn.particlesEmpty();
			this.params.fn.particlesCreate();
			this.params.fn.particlesDraw();
			this.params.fn.vendors.densityAutoParticles();
		}

		this.params.fn.vendors.densityAutoParticles();
	}

}