import State from "../../Wolfie2D/DataTypes/State/State";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Input from "../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import PlayerController, { PlayerAnimations, PlayerControls, PlayerStates } from "./PlayerController";

/**
 * An abstract state for the PlayerController 
 */
export abstract class PlayerState extends State {
    protected parent: PlayerController;
    protected owner: AnimatedSprite;
    protected gravity: number;

    public constructor(parent: PlayerController, owner: AnimatedSprite) {
        super(parent);
        this.owner = owner;
        this.gravity = 500;
    }

    public abstract onEnter(options: Record<string, any>): void;

    /**
     * Handle game events from the parent.
     * @param event the game event
     */
    public handleInput(event: GameEvent): void {
        switch (event.type) {
            // Default - throw an error
            default: {
                throw new Error(`Unhandled event in PlayerState of type ${event.type}`);
            }
        }
    }

    public update(deltaT: number): void {
        // This updates the direction the player sprite is facing (left or right)
        let direction = this.parent.moveDir;
        if (direction.x !== 0) {
            this.owner.invertX = MathUtils.sign(direction.x) < 0;
        }
    }

    public abstract onExit(): Record<string, any>;
}

export class Attack extends PlayerState {
    public onEnter(options: Record<string, any>): void {

    }

    public handleInput(event: GameEvent): void { }

    public update(deltaT: number): void { }

    public onExit(): Record<string, any> { return {}; }
}

export class Dead extends PlayerState {
    public onEnter(options: Record<string, any>): void {

    }

    // Ignore all events from the rest of the game
    public handleInput(event: GameEvent): void { }

    // Empty update method - if the player is dead, don't update anything
    public update(deltaT: number): void { }

    public onExit(): Record<string, any> { return {}; }
}

export class Fall extends PlayerState {
    public onEnter(options: Record<string, any>): void {
        this.parent.velocity.y = 0;
    }

    public handleInput(event: GameEvent): void { }

    public update(deltaT: number): void {
        if (this.owner.onGround) {
            // TODO: If we want fall damage or not
            // this.parent.health -= Math.floor(this.parent.velocity.y / 200);
            this.finished(PlayerStates.IDLE);
        } else {
            let dir = this.parent.moveDir;
            this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;
            this.parent.velocity.y += this.gravity*deltaT;
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }
    }

    public onExit(): Record<string, any> { return {}; }
}

export class Idle extends PlayerState {
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(PlayerAnimations.IDLE);
        this.parent.speed = this.parent.MIN_SPEED;
        this.parent.velocity.x = 0;
        this.parent.velocity.y = 0;
    }

    public handleInput(event: GameEvent): void { }

    public update(deltaT: number): void {
        super.update(deltaT);
        let dir = this.parent.moveDir;
        if (!dir.isZero() && dir.y === 0)
            this.finished(PlayerStates.WALK);
        else if (Input.isJustPressed(PlayerControls.MOVE_UP))
            this.finished(PlayerStates.JUMP);
        else if (!this.owner.onGround && this.parent.velocity.y > 0)
            this.finished(PlayerStates.FALL);
        else {
            this.parent.velocity.y += this.gravity * deltaT;
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }   
    }

    public onExit(): Record<string, any> {
        this.owner.animation.stop(); 
        return {};
    }
}

export class Jump extends PlayerState {
    public onEnter(options: Record<string, any>): void {

    }

    public handleInput(event: GameEvent): void { }

    public update(deltaT: number): void { }

    public onExit(): Record<string, any> { return {}; }
}

export class Walk extends PlayerState {
    public onEnter(options: Record<string, any>): void {

    }

    public handleInput(event: GameEvent): void { }

    public update(deltaT: number): void { }

    public onExit(): Record<string, any> { return {}; }
}