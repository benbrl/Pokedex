for (let i = 0; i < 1025; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
        .then(response => response.json())
        .then(data => {
            const types = data.types.map(type => type.type.name);
            const imagePath = data.sprites.other.dream_world.front_default;
            let description = null;
            let name = null;

            return fetch(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`)
                .then(response => response.json())
                .then(data2 => {
                    const flavorTextEntry = data2.flavor_text_entries.find(entry => entry.language.name === 'fr');
                    if (flavorTextEntry) {
                        description = flavorTextEntry.flavor_text;
                    }

                    const nameEntry = data2.names.find(entry => entry.language.name === 'fr');
                    if (nameEntry) {
                        name = nameEntry.name;
                    }

                    const gameIndices = data.game_indices;
                    const regions = {
                        'red': 'Kanto',
                        'blue': 'Kanto',
                        'yellow': 'Kanto',
                        'gold': 'Johto',
                        'silver': 'Johto',
                        'crystal': 'Johto',
                        'ruby': 'Hoenn',
                        'sapphire': 'Hoenn',
                        'emerald': 'Hoenn',
                        'firered': 'Kanto',
                        'leafgreen': 'Kanto',
                        'diamond': 'Sinnoh',
                        'pearl': 'Sinnoh',
                        'platinum': 'Sinnoh',
                        'heartgold': 'Johto',
                        'soulsilver': 'Johto',
                        'black': 'Unova',
                        'white': 'Unova',
                        'black-2': 'Unova',
                        'white-2': 'Unova',
                        'x': 'Kalos',
                        'y': 'Kalos',
                        'omega-ruby': 'Hoenn',
                        'alpha-sapphire': 'Hoenn',
                        'sun': 'Alola',
                        'moon': 'Alola',
                        'ultra-sun': 'Alola',
                        'ultra-moon': 'Alola',
                        'lets-go-pikachu': 'Kanto',
                        'lets-go-eevee': 'Kanto',
                        'sword': 'Galar',
                        'shield': 'Galar',
                        'brilliant-diamond': 'Sinnoh',
                        'shining-pearl': 'Sinnoh',
                        'legends-arceus': 'Hisui',
                        'scarlet': 'Paldea',
                        'violet': 'Paldea'
                    };

                    const gameRegions = gameIndices.map(game => regions[game.version.name] || 'Unknown');
                    const uniqueRegions = [...new Set(gameRegions)];
                    const regionWithIndex = uniqueRegions.map(region => {
                        const gameIndex = gameIndices.find(game => regions[game.version.name] === region).game_index;
                        return { regionName: region, regionPokedexNumber: gameIndex };
                    });

                    const soundUrl= data.cries.latest;
                    const height = data.height / 10;
                    const weight = data.weight / 10;

                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Authorization", "Bearer");

                    const raw = JSON.stringify({
                        name,
                        types,
                        imgUrl: imagePath,
                        description,
                        regions: regionWithIndex,
                        height,
                        weight,
                        soundUrl,
                    });

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    return fetch("http://localhost:3000/api/pkmn", requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.error(error));
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
}
