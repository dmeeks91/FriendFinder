var people = require("../data/friends"),
    compareScores = function(p1, p2) {
        var diff = 0;
        for (var i = 0; i < p1.length; i++)
        {
            diff += Math.abs(p1[i] - p2[i]);
        }
        return diff;
    };

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(people);
    });

    app.post("/api/friends", function(req, res) {
        var newPerson = req.body,
            differences = people.map(person => compareScores(person.scores, newPerson.scores)),
            matchIndx = differences.indexOf(Math.min(...differences)),
            exists =  people.filter(person => person.name === req.body.name);
        
        //prevents multiple people with the same name
        if (exists.length === 0) 
        {
            req.body.scores = req.body.scores.map(score => parseInt(score));
            people.push(req.body);
        }

        res.json(people[matchIndx]);
    });
};