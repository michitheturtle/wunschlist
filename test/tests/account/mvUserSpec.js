/**
 * Created by mdi on 24.11.2015.
 */
describe('mvUser', function(){

    beforeEach(module('app'));

    describe('isAdmin', function(){
        it('should return false if not in role admin', inject(function(mvUser){
            var uzer = new mvUser();
            user.roles = ['not admin'];
            except(user.isAdmin()).to.be.falsey;
        }));

        it('should return true because admin', inject(function(mvUser){
            var uzer = new mvUser();
            user.roles = ['admin'];
            except(user.isAdmin()).to.be.true;
        }));
    })

})