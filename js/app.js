

window.onload = () => {
    let btnwhite = document.getElementById(`white`);
    let btncali = document.getElementById(`cali`);
    let amntRice = document.getElementById(`cups`);
    let recipe = document.getElementById(`recipe`);
    let status = `cali`;
    btnwhite.addEventListener(`click`, () => {
        status = `white`;
        recipe.innerHTML = setWhiteRecipe(amntRice.value);
    });
    btncali.addEventListener(`click`, () => {
        status = `cali`;
        recipe.innerHTML = setCaliRecipe(amntRice.value);
    });

    /*amntRice.addEventListener( `update`, () =>{
        if(status.equals(`cali`))
            setCaliRecipe(amntRice.value);
        else
            setWhiteRecipe(amntRice.value);
    });*/

    function setCaliRecipe(amnt) {
        let ratio = amnt/1.25;
        return `For slightly al dente rice:<br>` +
            `Combine ` + amnt + ` cup(s) of rice with ` + (ratio*2) +
            ` cup(s) of water or broth and ` + (ratio*1) + ` Tbsp olive oil.` +
            `Bring to a boil and stir once to mix. Reduce heat to low, ` +
            `cover with a tight-fitting lid and cook for 25 minutes.` +
            `Remove from heat and let stand for 5 minutes. ` +
            `Fluff with a fork and serve. <br>` +
            `For softer rice: <br>` +
            `Increase liquid by 1/2 cup and cook time by 5 minutes.`;
    }

    function setWhiteRecipe(amnt) {
        let ratio = amnt;
        return `Combine ` + amnt + ` cup(s) of rice with ` + (2*ratio) +
            ` cup(s) of water and ` + (1*ratio) + ` Tbsp olive oil. ` +
            `Bring to a boil, then reduce heat to the lowest setting. ` +
            `Cook for about 18 minutes.`;
    }


};
