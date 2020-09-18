import { Resolver, Ctx, Arg, Mutation, ObjectType, Field, InputType } from 'type-graphql';
import { User } from 'src/entities/User';
import { MyContext } from 'src/types';
import argon, { argon2i } from 'argon2';

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        if (options.username.length <= 2) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: 'username should be more than 2 characters'
                    }
                ]
            }
        }
        if (options.password.length <= 3) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'password should be more than 2 characters'
                    }
                ]
            }
        }
        const hashedPassword = await argon.hash(options.password);
        const user = em.create(User, { username: options.username, password: hashedPassword });
        try {
            await em.persistAndFlush(user);
        } catch (e) {
            if(e.code === '23505') {
                return  {
                    errors: [
                        {
                            field: 'username',
                            message: 'username has been taken'
                        }
                    ]
                }
            }
        }
        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, { username: options.username });
        if (!user) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: 'Username does not exist'
                    }
                ]
            };
        }
        const valid = await argon.verify(user.password, options.password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'Incorrect password'
                    }
                ]
            };
        }
        return {
            user
        }
    }
}