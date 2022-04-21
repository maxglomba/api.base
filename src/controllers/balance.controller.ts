import { Request, Response} from 'express';
import { route, GET } from 'awilix-express';
import { BalanceService } from '../services/balance.service';
import { BaseController } from '../common/controllers/base.controller';


/**
 * @swagger
 * components:
 *  schemas:
 *   Balance:
 *    type: object
 *    properties:
 *     id: 
 *      type: string
 *      description: the auto-generated id of balance
 *     name:
 *      type: string
 *      description: the name of the balance
 *     description:
 *      type: string
 *      description: the description of the balance
 *    required:
 *     - name
 *     - description
 *    example:
 *     id: RR7BOO3bPUpLFh0jv6wr_
 *     name: My firs balance
 *     description: I need do something.
 *   CreateBalance:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      description: the name of the balance
 *     description:
 *      type: string
 *      description: the description of the balance
 *    required:
 *     - name
 *     - description
 *    example:
 *     name: My firs balance
 *     description: I need do something.
 *   BalanceNotFound:
 *    type: object
 *    properties:
 *     msg:
 *      type: string
 *      description: A message for a not found balance
 *    example:
 *     msg: The balance not found
 *  parameters:
 *   BalanceId:
 *    in: path
 *    name: id
 *    required: true
 *    schema:
 *     type: string
 *     description: the balance id
 */

/**
 * @swagger
 * tags:
 *  name: Balance
 *  description: Balance enpoints
 */

/**
 * @swagger
 * /balances:
 *  get:
 *   summary: Return a Balance list
 *   tags: [Balance]
 *   responses:
 *    200:
 *     description: the list of balance
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Balance'
 *         
 *         
 */
@route('/api/balances')
export class BalanceController extends BaseController{
    constructor(
        private readonly balanceService: BalanceService
    ) {
        super();
     }

    @GET()
    public async all (req: Request, res: Response) {
        try{
            res.send(
                await this.balanceService.all()
            );
        }catch(error){
            this.handleException(error, res);
        }
        
    }

    //Ex: balances/1
    @route('/:id')
    @GET()
    public async find (req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const result = await this.balanceService.find(id);

            if(result){
                res.send(result);
            }else{
                res.status(404);
                res.send();
            }
           
        }catch(error){
            this.handleException(error, res);
        }
    }

     //Ex: balances/1
     @route('/user/:user_id')
     @GET()
     public async findByUserId (req: Request, res: Response) {
         try{
             const user_id = parseInt(req.params.user_id);
             const result = await this.balanceService.findByUserId(user_id);
 
             if(result){
                 res.send(result);
             }else{
                 res.status(404);
                 res.send();
             }
            
         }catch(error){
             this.handleException(error, res);
         }
     }


}