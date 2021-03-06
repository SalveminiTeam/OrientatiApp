﻿import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
declare const THREE;


@Component({
    selector: 'viewer360',
    templateUrl: 'viewer360.html'
})
export class Viewer360Component implements OnDestroy {

    camera;
    controls;
    renderer;
    scene;
    manager;
    animating: boolean = true;

    @ViewChild("container") container: ElementRef;


    constructor(private Viewer360Element: ElementRef) {

    }

    ngOnDestroy() {
        
        if (this.renderer) this.renderer.dispose();

        if (this.controls) this.controls.dispose();


    }

    Init(imagePath: string) {

        this.manager = new THREE.LoadingManager();
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.nativeElement.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.z = 0.01;

        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.autoRotate = true;

        var textures = this.getTexturesFromAtlasFile("assets/360photos/" + imagePath + ".png", 6);

        var materials = [];

        for (var i = 0; i < 6; i++) {

            materials.push(new THREE.MeshBasicMaterial({ map: textures[i] }));

        }

        var skyBox = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MultiMaterial(materials));
        skyBox.applyMatrix(new THREE.Matrix4().makeScale(1, 1, - 1));
        this.scene.add(skyBox);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);

    }

    getTexturesFromAtlasFile(atlasImgUrl, tilesNum) {

        var textures = [];

        for (var i = 0; i < tilesNum; i++) {

            textures[i] = new THREE.Texture();

        }

        var imageObj = new Image();

        imageObj.onload = function () {

            var canvas, context;
            var tileWidth = imageObj.height;

            for (var i = 0; i < textures.length; i++) {

                canvas = document.createElement('canvas');
                context = canvas.getContext('2d');
                canvas.height = tileWidth;
                canvas.width = tileWidth;
                context.drawImage(imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth);
                textures[i].image = canvas
                textures[i].needsUpdate = true;

            }
        };

        imageObj.src = atlasImgUrl;

        return textures;
    }

    public toggleControls() {

        if (this.controls instanceof THREE.OrbitControls) {
            this.controls = new THREE.DeviceOrientationControls(this.camera);
        } else {
            this.controls = new THREE.OrbitControls(this.camera);
            this.controls.reset();
            this.controls.enableZoom = false;
            this.controls.enablePan = false;
        }

    }

    public toggleRotation() {
        if (this.controls.autoRotate == true) { this.controls.autoRotate = false; }
        else if (this.controls.autoRotate == false) { this.controls.autoRotate = true; } 
    }

    public isNormal() {
        return this.controls instanceof THREE.OrbitControls;
    }

    public isRotating() {
        return this.controls.autoRotate;
    }


    startAnimation() {
        /*let width = this.Viewer360Element.nativeElement.childNodes[0].clientWidth;
        let height = this.Viewer360Element.nativeElement.childNodes[0].clientHeight;
        this.renderer.setSize(width, height);*/
        this.animating = true;
        this.render();
    }

    stopAnimation() {


        this.renderer.clear();

//        if (this.manager) this.manager.dispose();
        //if (this.renderer) this.renderer.dispose();
//        if (this.camera) this.camera.dispose();
//        if (this.scene) this.scene.dispose();
        //if (this.controls) this.controls.dispose();


        this.animating = false;
    }

    render() {
        if (this.animating) {
            this.controls.update();
            this.renderer.render(this.scene, this.camera)
            requestAnimationFrame(() => { this.render() });
        }
    }


}

