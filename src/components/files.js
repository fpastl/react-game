
export let effect_crush=new Audio('src/music/effect_crush.mp3');
export let effect_move=new Audio('src/music/effect_move.mp3');
export let effect_new_game=new Audio('src/music/effect_new_game.mp3');

export class BGMusic{
    static music=new Audio(); 
    static Play =(i) =>{
        const playList=['Bio Unit - Aerial.mp3','Bio Unit - Fire Flies.mp3'];
        const current=i%playList.length;
        this.music.src='src/music/'+playList[current];
        this.music.play();
        this.music.onended=()=>this.Play(current+1);
    }
    static Pause=()=> this.music.pause();
};


