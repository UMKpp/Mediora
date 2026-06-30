using Mediora.Api.Models;

namespace Mediora.Api.Services;

public interface IJwtTokenService
{
    string GenerateToken(User user);
}
