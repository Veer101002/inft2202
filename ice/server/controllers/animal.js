/*
Name: Virendrasinh Chauhan
*/

//import dataService from '../service/dataService.mock.js';
import dataService from '../service/dataService.js';

const animalService = dataService('animal');
const animal = {
    index: async function (_, res){
        try{
            let ret;
            const user = _.headers['user'];
            if(_.params.name){
                ret = await animalService.query(_.params.name);
            } else {
                ret = await animalService.load(_.query);
            }
            res.json(ret);
        }
        catch(err){
            res.status(400).send(err);
        }
    },
    add: async function (_, res){
        try{
            const user = _.headers['user'];
            const userData = _.body.map(item => { return {_id: item.name, ...item, user, createTime:Math.floor(Date.now() / 1000), updateTime:null}});

            let ret = await animalService.add(userData);
            res.status(201).send({ message: ret });
        }
        catch(err){
            res.status(400).send(err);
        }
    },
    update: async function (_, res){
        try{
            const userData = _.body;
            delete userData.createTime;
            userData.updateTime = Math.floor(Date.now() / 1000);
            let ret = await animalService.update(userData);
            res.status(200).send({ message: ret });
        }
        catch(err){
            res.status(400).send(err);
        }
    },    
    delete: async function (_, res){
        try{
            const user = _.headers['user'];
            if(_.params.name){
                let ret = await animalService.delete(_.params.name);
                res.status(200).send({ message: ret });
            } else {
                res.status(406).send('Not Accepted');
            }   
        }
        catch(err){
            res.status(400).send(err);
        }     
    }
};

export default animal;