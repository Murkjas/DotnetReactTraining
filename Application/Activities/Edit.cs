using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        // Only have one type here, as we are not returning anything
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Adds the activity in memory. We're not touching the database, so no async needed
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                // No need to specify all updated fields, as mapper will handle that
                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync();

                // Return a value to let the API Controller know, that we're finished with this request
                return Unit.Value;
            }
        }
    }
}